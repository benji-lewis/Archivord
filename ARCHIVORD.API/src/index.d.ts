import { Request } from 'express';

export namespace archivord {
	interface ReqUserInfo extends Request {
		user?: object;
	}
}