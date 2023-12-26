import { db } from '../utils/firebaseCreds';
import { archivord } from '../index.d';
import { Timestamp, FieldValue, Filter, DocumentData, QuerySnapshot } from 'firebase-admin/firestore';
import { defaultMaxListeners } from 'events';


/**
 * Writes data to Firestore
 * 
 * @param db - Firestore instance 
 * @param collection - Collection name
 * @param data - Data to be written
 * 
 * @returns 
 */
async function writeToFirestore(collection: string, data: DocumentData): Promise<string | undefined> {
	try {
		const docRef = await db.collection(collection).add(data);
		console.log('Document written with ID: ', docRef.id);
		return docRef.id;
	} catch (error) {
		console.error('Error adding document: ', error);
	}
}

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
			const msgColl = db.collection("guilds").doc(guildId).collection("channels").doc(channelId).collection("messages").doc(msgId);
			await msgColl.set(messages[msgId], {merge: true});
		});
		return true;
		// const msgData = messages[msgId];
		// const docRef = await msgColl.doc(msgId).set(msgData);
		// console.log('Document written with ID: ', docRef.id);
		// 	const docRefs = await Promise.all(data.map((d) => msgColl.add(d)));
		// 	console.log('Documents written with IDs: ', docRefs.map((d) => d.id));
		// 	return docRefs.map((d) => d.id);
		// } catch (error) {
		// 	console.error('Error adding documents: ', error);
		// 	return [];
		// }
	} catch (err) {
		throw new Error("Error writing messages to Firestore" + err);
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
		const channelColl = db.collection("guilds").doc(guildId).collection("channels").doc(channelId);
		await channelColl.set(metadata, {merge: true});
		return true;
	} catch (err) {
		throw new Error("Error writing metadata to Firestore" + err);
	}
}

async function writeGuildDataToFirestore(guildId: string, guildName: string): Promise<boolean> {
	try {
		const guildColl = db.collection("guilds").doc(guildId);
		await guildColl.set({"name": guildName}, {merge: true});
		return true;
	} catch (err) {
		throw new Error("Error writing metadata to Firestore" + err);
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

export { writeToFirestore, writeMessagesToFirestore, writeChannelMetadataToFirestore, writeGuildDataToFirestore, getPaginatedData }
