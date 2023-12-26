import axios from 'axios';
import type { archivord } from '../index.d';
import type { RequestHandler } from 'express';
// Available log levels: log, info, debug, warn, error
import { debug, warn, error } from 'firebase-functions/logger';

/**
 * Checks a provided discord token is valid
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @return {Promise<boolean>} - Bool indicating if the token is valid
 */
export const checkDiscordToken: RequestHandler = async (req: archivord.ReqUserInfo, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		res.status(401).send('Unauthorized');
		return;
	}

	const token = authHeader.split(' ')[1];
	try {
		debug('Validating Token');
		const response = await axios.get('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.status !== 200) {
			res.status(401).send('Invalid Discord token');
			warn('Invalid Discord token');
			return;
		}

		debug('Token Validated');

		req.user = response.data;
		next();
	} catch (err) {
		error('Error verifying Discord token', err);
		res.status(500).send('Error verifying Discord token');
		return;
	}
};
