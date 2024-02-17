// SPDX-FileCopyrightText: 2024 Ben Lewis <oss@benjilewis.dev>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import * as archivord from '../index.d';
import { Guild, TextChannel, ChannelType, Client } from 'discord.js';

/** 
 * Get all servers a user and the bot is in. 
 * 
 * @param userId The id of the user to filter by.
 * @param client The Discord client. //TODO: Confirm this
 * 
 * @returns An array of servers.
 */
function getServersByUser(userId: string, client: Client): Guild[] {
	const servers: Guild[] = [];

	client.guilds.cache.forEach((guild) => {
		if (guild.members.cache.has(userId)) {
			servers.push(guild);
		}
	});

	return servers;
}

/**
 * Get all channels within a specified server. 
 * 
 * @param guild The guild to get the channels from.
 * 
 * @returns An array of channels.
*/
async function getChannelsByServer(guild: Guild): Promise<TextChannel[]> {
	const channels: TextChannel[] = [];

	const chans = await guild.channels.fetch();
	chans.forEach((channel) => {
		if (channel != null && channel.type === ChannelType.GuildText) {
			channels.push(channel as TextChannel);
		}
	});

	return channels;
}

/**
 * Gets metadata for a discord channel
 * 
 * @param {TextChannel} channel The channel to get the metadata for
 * 
 * @returns {archivord.Channel} The channel metadata
 */
async function getChannelMetadata(channel: TextChannel): Promise<archivord.Channel> {
	// const roles = await getChannelRoles(channel);
	const metadata: archivord.Channel = {
		channelName: channel.name,
		roles: []
	};

	return metadata;
}

export { getServersByUser, getChannelsByServer, getChannelMetadata };