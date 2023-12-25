//#region Imports
import { onRequest } from 'firebase-functions/v2/https';
// Available log levels: log, info, debug, warn, error
// import { debug } from 'firebase-functions/logger';
// import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { initializeApp } from 'firebase-admin/app';
// import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import { getFirestore } from 'firebase-admin/firestore';

import readme = require('readmeio');
import express = require('express');
import cors = require('cors');

import { checkDiscordToken } from './helpers/auth';
import { archivord } from './index.d';
//#endregion
//#region App Setup
const app = express();

const readmeApiKey = process.env.README_API_KEY as string;

initializeApp();
const db = getFirestore();

app.use(cors({ origin: ['http://localhost:5173', 'https://archivord.web.app', 'https://archivord.benjilewis.dev',] }));
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
//#endregion

//#region /guilds
app.get('/guilds', async (req, res) => {
	//TODO: Implement checking of priveleges
	const guildResponse: archivord.Guilds = {};
	const guildColl = db.collection('guilds');
	const guilds = await guildColl.get();
	await guilds.forEach((guild) => {
		const guildData = guild.data();
		guildResponse[guild.id] = {
			'guildName': guildData.name,
			'icon': guildData.icon,
		};
	});

	res.set('Content-Type', 'application/json');
	res.status(200).send(guildResponse);
});

app.get('/guilds/:guildId/channels', (req, res) => {
	const chanRef = db.collection('guilds').doc(req.params.guildId).collection('channels');
	const chanData: archivord.Channels = {};
	chanRef.get().then((snapshot) => {
		snapshot.forEach((doc) => {
			const chanData = doc.data();
			chanData[doc.id] = {
				'channelName': chanData.channelName,
				'topic': chanData.topic,
			};
		});
		res.set('Content-Type', 'application/json');
		res.status(200).send(chanData);
	});
});

app.get('/guilds/:guildId/channels/:channelId/messages', (req, res) => {
	const messageRef = db.collection('guilds').doc(req.params.guildId).collection('channels').doc(req.params.channelId).collection('messages');
	const messageData: archivord.Messages = {};
	messageRef.get().then((snapshot) => {
		snapshot.forEach((doc) => {
			const data = doc.data();
			messageData[doc.id] = {
				'content': data.content,
				'authorId': data.authorId,
				'authorUsername': data.authorUsername,
				'authorNick': data.authorNick,
				'timestamp': data.timestamp
			};
		});
		res.set('Content-Type', 'application/json');
		res.status(200).send(messageData);
	});
});
//#endregion

exports.widget = onRequest({ region: 'europe-west1' }, app);
