import { Request } from 'express';
import { Timestamp } from 'firebase-admin/firestore';

export namespace archivord {
	interface ReqUserInfo extends Request {
		user?: DiscordUser;
	}

	interface DiscordUser {
		id: string,
		username: string,
		avatar: string,
		discriminator: number,
		public_flags: number,
		premium_type: number,
		flags: number,
		banner: string,
		accent_color: string | null,
		global_name: string,
		avatar_decoration_data: {
			asset: string,
			sku_id: string
		},
		banner_color: string | null,
		mfa_enabled: boolean,
		locale: string,
		email: string,
		verified: boolean
	}

	interface Guilds {
		[guildId: string]: Guild;
	}

	interface Guild {
		guildName: string;
		icon: string;
		channels?: {
			[channelId: string]: Channel;
		};
	}

	interface Channels {
		[channelId: string]: Channel;
	}

	interface Channel {
		channelName: string;
		topic: string;
		roles?: string[];
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
