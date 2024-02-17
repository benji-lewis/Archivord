/* eslint-disable @typescript-eslint/no-unused-vars */
import { Timestamp } from 'firebase-admin/firestore';

declare module archivord {
	interface Guild {
		guildName?: string;
		channels?: Channels;
	}

	interface Channel {
		channelName?: string;
		roles?: string[];
		messages?: Messages;
		archived?: boolean;
	}

	interface Message {
		content: string;
		authorId: string;
		authorUsername: string;
		authorNick?: string;
		timestamp: Timestamp;
	}

	interface Guilds { [guildId: string]: Guild; }

	interface Channels { [channelId: string]: Channel; }

	interface Messages { [messageId: string]: Message; }
}

export = archivord;