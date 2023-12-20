import { Request } from 'express';

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
}
