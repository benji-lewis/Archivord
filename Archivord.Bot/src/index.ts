// SPDX-FileCopyrightText: 2024 Ben Lewis <oss@benjilewis.dev>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

//#region Imports
import * as archivord from './index.d';
import { BaseChannel, ChannelType, Client, ClientOptions, Collection, Events, Guild, GuildChannel, Interaction, Snowflake, TextChannel } from 'discord.js';
import { resolve } from 'path';
import { Timestamp } from '@google-cloud/firestore';
import { writeNewGuildToFirestore, writeChannelMetadataToFirestore, writeMessagesToFirestore, checkChannelArchived } from './helpers/firebase';
import { sendMessageToSNS } from './helpers/aws';
//#endregion

//#region Dotenv Config
import { config } from 'dotenv';
import { getChannelMetadata } from './helpers/discord';
config({
	path: resolve(__dirname, '../.env')
});
//#endregion

//#region Discord.js Config
const discordConfig: ClientOptions = {
	intents: [
		'Guilds',
		'GuildMessages',
		// 	'GuildMembers',
		'MessageContent'
	]
};

const client = new Client(discordConfig);

client.on('ready', () => {
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'backup') {
		await interaction.reply({ content: 'Starting Backup!', ephemeral: true });
		invokeInitialBackup(interaction as Interaction);
	}

	if (interaction.commandName === 'archive') {
		const archived = interaction.options.get('state')?.value as boolean;
		const guildId = interaction.guildId;
		const channelId = interaction.channelId;
		if (!guildId || !channelId) return;
		await writeChannelMetadataToFirestore(guildId, channelId, { archived });
		await interaction.reply({ content: 'Channel archived status updated!', ephemeral: true });
	}
});

client.on(Events.GuildCreate, createNewGuild);

client.on(Events.MessageCreate, async message => {
	// Get Guild & Channel ID
	const guildId = message.guild?.id;
	const channelId = message.channel.id;

	if (!guildId || !channelId) return;
	
	const SQSData: archivord.aws.ISQSMessage = {
		messageType: 'message',
		guildId,
		channelId,
		messageId: message.id,
		content: message.content,
		authorId: message.author.id,
		authorUsername: message.author.username,
		timestamp: Timestamp.fromDate(message.createdAt)
	};
	
	if (await checkChannelArchived(guildId, channelId)) sendMessageToSNS(SQSData);
});

client.login(process.env.discordToken);
//#endregion

/**
 * Invokes an initial backup of one server
 * 
 * @remarks - To be invoked by a slash command
 * @todo - Setup slash command
 * 
 * @param channel - The channel the command was invoked in
 * 
 * @returns {boolean} - Whether the backup was successful
 */
async function invokeInitialBackup(inter: Interaction) {
	// Starts timer to measure how long the backup takes
	const invokeTime = new Date().getTime();
	//#region Gets the specific channel
	let messageList: [string?] = [];
	if (!inter.channelId || !inter.guildId || !inter.guild) throw new Error('Not supported in DMs');
	const guildId = inter.guildId;
	const chanId = inter.channelId;
	let channel = client.channels.cache.get(chanId) as TextChannel;
	if (!channel) {
		try {
			channel = await client.channels.fetch(chanId) as TextChannel;
		} catch (err) {
			throw new Error('Channel not found' + err);
		}
	}
	if (!channel) throw new Error('Channel not found');
	//#endregion
	//#region Sets metadata
	const chnlMdta = await getChannelMetadata(channel);
	writeChannelMetadataToFirestore(guildId, chanId, chnlMdta);
	// writeGuildDataToFirestore(guildId, inter.guild.name);
	console.log('Started backup of ' + chnlMdta.channelName);
	let done: boolean = false;
	while (!done) {
		const before = messageList.length > 0 ? messageList[messageList.length - 1] : undefined;
		messageList = [];
		const msgData: archivord.Messages = {};
		const messages = await channel.messages.fetch({ limit: 100, before });
		if (messages.size < 100) {
			done = true;
		}
		await messages.forEach(message => {
			msgData[message.id] = {
				content: message.content,
				authorId: message.author.id,
				authorUsername: message.author.username,
				timestamp: Timestamp.fromDate(message.createdAt), // Convert to epoch timestamp
			};
			messageList.push(message.id);
		});
		await writeMessagesToFirestore(guildId as string, chanId as string, msgData);
	}
	console.log('Done!');
	console.log('That took ' + (new Date().getTime() - invokeTime) + 'ms');
	return true;
}

/**
 * Initialises a new guild in the database
 * 
 * @param guild - The guild to be initialised
 * 
 * @returns {void} - Whether the guild was initialised
 */
async function createNewGuild(guild: Guild) {
	if (!guild || !guild.channels || !guild.channels.cache || !guild.icon) return;
	// Get all channels in the guild
	const channels = await convertChannels(guild.channels.cache);

	// Write the guild metadata to the database
	await writeNewGuildToFirestore(guild.id, guild.icon, guild.name, channels);
}

/**
 * Converts a discord channel cache into a list of channel metadata
 * 
 * @param channels - The discord channel cache
 * 
 * @returns {archivord.Channels} - The list of channel metadata
 */
async function convertChannels(channels: Collection<Snowflake, BaseChannel>) {
	const channelList: archivord.Channels = {};
	for (const channel of channels.values()) {
		if (channel.type !== ChannelType.GuildText || !(channel instanceof GuildChannel)) continue;
		try {
			const chanData = await channel.fetch();
			if (!chanData) continue;
			if ('name' in chanData && typeof chanData.name === 'string') {
				channelList[channel.id] = {
					channelName: chanData.name,
					archived: false
				};
			}
		} catch (error) {
			console.error('Error fetching channel: ', error);
		}
	}
	return channelList;
}
