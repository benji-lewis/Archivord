/* eslint-disable @typescript-eslint/no-unused-vars */
import { Timestamp } from 'firebase-admin/firestore';

export namespace archivord {
	interface Guilds {
		[guildId: string]: Guild;
	}

	interface Guild {
		guildName: string;
		channels?: {
			[channelId: string]: Channel;
		};
	}

	interface Channel {
		channelName: string;
		roles: string[];
		messages?: Messages;
	}

	interface Messages {
		[messageId: string]: Message;
	}

	interface Message {
		content: string;
		authorId: string;
		authorUsername: string;
		authorNick?: string;
		timestamp: Timestamp;
	}
}