import { onRequest } from 'firebase-functions/v2/https';
// Available log levels: log, info, debug, warn, error
// import { debug } from 'firebase-functions/logger';
import readme = require('readmeio');
import express = require('express');
import cors = require('cors');
import { checkDiscordToken } from './helpers/auth';
import { archivord } from './index.d';
const app = express();

const readmeApiKey = process.env.README_API_KEY as string;
const readmeSecret = process.env.README_SECRET as string;

app.use(cors({ origin: [
	'http://localhost:5173',
	'https://archivord.web.app',
	'https://archivord.benjilewis.dev',
] }));
app.use(checkDiscordToken);
app.use((req: archivord.ReqUserInfo, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ') || !req.user || !req.user.username || !req.user.email) {
		res.status(401).send('Unauthorized');
		return;
	}
	const token = authHeader.split(' ')[1];

	readme.log(readmeApiKey, req, res, {
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
	res.set('Content-Type', 'application/json');
	res.set('Access-Control-Allow-Origin', '*');
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
	res.set('Content-Type', 'application/json');
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
	res.set('Content-Type', 'application/json');
	res.status(501).send(dummyData);
});

app.post('/webhook', express.json({ type: 'application/json' }), async (req, res) => {
	// Verify the request is legitimate and came from ReadMe.
	const signature = req.headers['readme-signature'] as string;
	try {
		readme.verifyWebhook(req.body, signature, readmeSecret);
	} catch (e: any) {
		// Handle invalid requests
		return res.status(401).json({ error: e.message });
	}
	// Fetch the user from the database and return their data for use with OpenAPI variables.
	// const user = await db.find({ email: req.body.email })
	return res.json({
		// OAS Security variables
		oauth: 'oauth',
	});
});

exports.widget = onRequest({ region: 'europe-west1' }, app);
