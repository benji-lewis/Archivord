//#region Imports
import { Client, ClientOptions, Events, Interaction, Message, TextChannel } from 'discord.js';
import { resolve } from 'path';
import { archivord } from './index.d';
import { writeChannelMetadataToFirestore, writeGuildDataToFirestore, writeMessagesToFirestore } from "./helpers/firebase";
import { Timestamp } from '@google-cloud/firestore';
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
		// 	'Guilds',
		// 	'GuildMessages',
		// 	'GuildMembers',
		'MessageContent'
	]
}

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
 * @returns void
 */
async function invokeInitialBackup(inter: Interaction) {
	// Starts timer to measure how long the backup takes
	const invokeTime = new Date().getTime();
	//#region Gets the specific channel
	let messageList: [string?] = [];
	if (!inter.channelId || !inter.guildId || !inter.guild) throw new Error("Not supported in DMs");
	const guildId = inter.guildId;
	const chanId = inter.channelId;
	let channel = client.channels.cache.get(chanId) as TextChannel;
	if (!channel) {
		try {
			channel = await client.channels.fetch(chanId) as TextChannel;
		} catch (err) {
			throw new Error("Channel not found" + err);
		}
	}
	if (!channel) throw new Error("Channel not found");
	//#endregion
	//#region Sets metadata
	const chnlMdta = await getChannelMetadata(channel);
	writeChannelMetadataToFirestore(guildId, chanId, chnlMdta);
	// writeGuildDataToFirestore(guildId, inter.guild.name);
	console.log("Started backup of " + chnlMdta.channelName);
	let done: boolean = false;
	while (!done) {
		const before = messageList.length > 0 ? messageList[messageList.length - 1] : undefined;
		messageList = []
		let msgData: archivord.Messages = {};
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
			}
			messageList.push(message.id);
		});
		await writeMessagesToFirestore(guildId as string, chanId as string, msgData);
	}
	console.log("Done!")
	console.log("That took " + (new Date().getTime() - invokeTime) + "ms");
}