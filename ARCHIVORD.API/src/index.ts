import { onRequest } from 'firebase-functions/v2/https';
// Available log levels: log, info, debug, warn, error
// import { debug } from 'firebase-functions/logger';
import readme = require('readmeio');
import express = require('express');
import { checkDiscordToken } from './helpers/auth';
import { archivord } from './index.d';
const app = express();

app.use(checkDiscordToken);
app.use((req: archivord.ReqUserInfo, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ') || !req.user || !req.user.username || !req.user.email) {
		res.status(401).send('Unauthorized');
		return;
	}
	const token = authHeader.split(' ')[1];

	readme.log('rdme_xn8s9h06045b8f21df0cefbd65178234b54cdfd3918c48be52af543ca773b70de70da9', req, res, {
		// User's API Key
		apiKey: token,
		// Username to show in ReadMe's dashboard
		label: req.user.username,
		// User's email address
		email: req.user.email,
	});
	return next();
});

app.get('/guilds', (req, res) => {
	const dummyData = {
		'624200301770965043': {
			'name': 'Archivord Test Server',
			'icon': '705c4bb3a9b72518086856ea58eb283f',

		}, '624200301770965044': {
			'name': 'Archivord Test Server 2',
			'icon': '705c4bb3a9b72518086856ea58eb283f',

		}, '624200301770965045': {
			'name': 'Archivord Test Server 3',
			'icon': '705c4bb3a9b72518086856ea58eb283f',

		}
	};
	res.status(501).send(dummyData);
});

app.get('/guilds/:guildId/channels', (req, res) => {
	const dummyData = {
		'624200301770965043': {
			'name': 'general',
			'topic': 'general chat',
		},
		'624200301770965044': {
			'name': 'second test',
			'topic': 'second test chat',
		},
	};
	res.status(501).send(dummyData);
});

app.get('/guilds/:guildId/channels/:channelId/messages', (req, res) => {
	const dummyData = {
		'additionalProp1': {
			'content': 'string',
			'authorId': 'string',
			'authorUsername': 'string',
			'authorNick': 'string'
		},
		'additionalProp2': {
			'content': 'string',
			'authorId': 'string',
			'authorUsername': 'string',
			'authorNick': 'string'
		},
		'additionalProp3': {
			'content': 'string',
			'authorId': 'string',
			'authorUsername': 'string',
			'authorNick': 'string'
		}
	};
	res.status(501).send(dummyData);
});

//TODO: Implement proper CORS
exports.widget = onRequest(
	{
		region: 'europe-west1',
		cors: ['localhost:5173', 'archivord.web.app', 'archivord.benjilewis.dev']
	}, app);
