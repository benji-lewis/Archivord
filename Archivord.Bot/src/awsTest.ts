import * as archivord from './index.d';
import { sendMessageToSNS } from './helpers/aws';
import { Timestamp } from 'firebase-admin/firestore';

const data: archivord.aws.ISQSMessage = {
	messageType: 'message',
	guildId: '1234567890',
	channelId: '1234567890',
	messageId: '1234567890',
	content: 'Hello, World!',
	authorId: '1234567890',
	authorUsername: 'TESTING',
	timestamp: Timestamp.fromDate(new Date())
};

sendMessageToSNS(data).then(console.log).catch(console.error);