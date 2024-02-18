/* eslint-disable @typescript-eslint/no-unused-vars */
// SPDX-FileCopyrightText: 2024 Ben Lewis <oss@benjilewis.dev>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

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

	module aws {
		interface ISQSGlobal {
			messageType: 'message' | 'guild' | 'channel';
			guildData?: Guild;
			channelData?: Channel;
			messageData?: Message;
		}

		interface ISQSGuild extends Guild {
			messageType: 'guild';
			guildId: string;
		}

		interface ISQSMessage extends Message {
			messageType: 'message';
			guildId: string;
			channelId: string;
			messageId: string;
		}

		interface ISQSChannel extends Channel {
			messageType: 'channel';
			guildId: string;
			channelId: string;
		}
	}
}

export = archivord;