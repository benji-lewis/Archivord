import { db } from '../utils/firebaseCreds';
import * as archivord from '../index.d';
import { Timestamp, FieldValue, Filter, DocumentData, QuerySnapshot } from 'firebase-admin/firestore';
import { defaultMaxListeners } from 'events';
import { Message } from 'discord.js';

/** 
 * Writes an array of messages to the correct location in a Firestore collection
 * 
 * @param guildId - The ID of the Discord server
 * @param channelId - The ID of the Discord channel
 * @param data - Array of messages to be written
 * 
 * @returns - Array of document IDs
 */
async function writeMessagesToFirestore(guildId: string, channelId: string, messages: archivord.Messages): Promise<boolean> {
	try {
		const msgIds = Object.keys(messages);
		msgIds.forEach(async (msgId) => {
			const msgColl = db.collection('guilds').doc(guildId).collection('channels').doc(channelId).collection('messages').doc(msgId);
			await msgColl.set(messages[msgId], {merge: true});
		});
		return true;
	} catch (err) {
		throw new Error('Error writing messages to Firestore' + err);
	}
}

/**
 * Writes metadata to the relevant location in a Firestore collection
 * 
 * @param guildId - The ID of the Discord server
 * @param channelId - The ID of the Discord channel
 * @param metadata - Metadata to be written
 * 
 * @returns - Array of document IDs
 */
async function writeChannelMetadataToFirestore(guildId: string, channelId: string, metadata: archivord.Channel): Promise<boolean> {
	try {
		const channelColl = db.collection('guilds').doc(guildId).collection('channels').doc(channelId);
		await channelColl.set(metadata, {merge: true});
		return true;
	} catch (err) {
		throw new Error('Error writing metadata to Firestore' + err);
	}
}

async function writeGuildDataToFirestore(guildId: string, guildName: string): Promise<boolean> {
	try {
		const guildColl = db.collection('guilds').doc(guildId);
		await guildColl.set({'name': guildName}, {merge: true});
		return true;
	} catch (err) {
		throw new Error('Error writing metadata to Firestore' + err);
	}
}

/**
 * Retrieves all documents from a Firestore collection paginated
 * 
 * @param db - Firestore instance
 * @param collection - Collection name
 * @param pageSize - Number of documents to be returned
 * @param startAfter - Document to start after
 * 
 * @returns - Array of documents 
 */
async function getPaginatedData(collection: string, pageSize: number, startAfter?: DocumentData): Promise<DocumentData[]> {
	try {
		let query = db.collection(collection).orderBy('createdAt').limit(pageSize);

		if (startAfter) {
			query = query.startAfter(startAfter);
		}

		const querySnapshot: QuerySnapshot<DocumentData> = await query.get();
		const documents: DocumentData[] = [];

		querySnapshot.forEach((doc) => {
			documents.push(doc.data());
		});

		return documents;
	} catch (error) {
		console.error('Error getting paginated data: ', error);
		return [];
	}
}

/**
 * Writes a new guild to the database, or updates it if it already exists
 * 
 * @param id - The ID of the Discord server
 * @param icon - The ID of the icon of the Discord server
 * @param name - The name of the Discord server
 * @param channels - The channels in the Discord server
 * 
 * @returns - Whether the guild was written
 */
async function writeNewGuildToFirestore(id: string, icon:string, name: string, channels: archivord.Channels): Promise<boolean> {
	try {
		const guildRef = db.collection('guilds').doc(id);
		const guildData = {name, icon};
		await guildRef.set(guildData, {merge: true});
		// Iterate through the channels and create them as new docs within the channels collection
		const channelIds = Object.keys(channels);
		channelIds.forEach(async (channelId) => {
			const channelRef = guildRef.collection('channels').doc(channelId);
			await channelRef.set(channels[channelId], {merge: true});
		});
		return true;
	} catch (error) {
		console.error('Error writing guild to Firestore: ', error);
		return false;
	}
}

/**
 * Checks if a channel is set to be archived
 * 
 * @param guildId - The ID of the Discord server
 * @param channelId - The ID of the Discord channel
 * 
 * @returns {boolean} - Whether the channel is set to be archived
 */
async function checkChannelArchived(guildId: string, channelId: string): Promise<boolean> {
	try {
		const channelRef = db.collection('guilds').doc(guildId).collection('channels').doc(channelId);
		const channelData = await channelRef.get();
		if (channelData.exists) return channelData.data()?.archived;
		return false;
	} catch (error) {
		console.error('Error checking if channel is archived: ', error);
		return false;
	}
}

/**
 * Writes a single message to the database
 * 
 * @param guildId - The ID of the Discord server
 * @param channelId - The ID of the Discord channel
 * @param message - The message to be written
 * 
 * @returns {boolean} - Whether the message was written
 */
async function writeMessageToFirestore(guildId: string, channelId: string, message: Message): Promise<boolean> {
	try {
		const msgData = {
			content: message.content,
			authorId: message.author.id,
			authorUsername: message.author.username,
			timestamp: Timestamp.fromDate(message.createdAt), // Convert to epoch timestamp
		};
		const messageRef = db.collection('guilds').doc(guildId).collection('channels').doc(channelId).collection('messages');
		await messageRef.add(msgData);
		return true;
	} catch (error) {
		console.error('Error writing message to Firestore: ', error);
		return false;
	}
}

export { writeMessagesToFirestore, writeChannelMetadataToFirestore, writeGuildDataToFirestore, getPaginatedData, writeNewGuildToFirestore, checkChannelArchived, writeMessageToFirestore };
