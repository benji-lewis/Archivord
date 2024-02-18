//#region Imports
import dotenv from 'dotenv';
import { SNS } from '@aws-sdk/client-sns';
import * as archivord from '../index.d';
//#endregion

//#region Dotenv Config
dotenv.config();
//#endregion

//#region AWS Config
//TODO: Properly .env this
const msgArn = 'arn:aws:sns:eu-west-2:975050122093:Archivord-Messages';
//#endregion

/** Sends a JSON object to a specified SNS queue for processing
 * 
 * @param {object} data The data to be sent to the SNS queue
 * @param {string} topicArn The ARN of the SNS topic to send the message to
 * 
 * @returns {Promise<boolean>} Whether the message was successfully sent to the SNS queue
 */
async function sendToSNS(Message: object, TopicArn: string): Promise<boolean> {
	// Create publish parameters
	const params = {
		Message: JSON.stringify(Message), // Stringify the Message object
		TopicArn
	};

	// Create promise and SNS service object
	const publishTextPromise = new SNS({ region: 'eu-west-2' }).publish(params);

	// Handle promise's fulfilled/rejected states
	try {
		const data = await publishTextPromise;
		console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
		console.log('MessageID is ' + data.MessageId);
		return true; // Return true if the message was successfully published
	} catch (err) {
		console.error(err);
		return false; // Return false if there was an error
	}
}

/**
 * Forwards a message to AWS SNS for storage in the SQS and then processing by the Lambda function
 * 
 * @param {archivord.aws.ISQSMessage} data The message to be sent to AWS
 * 
 * @returns {Promise<boolean>} Whether the message was successfully sent to AWS
 */
async function sendMessageToSNS(data: archivord.aws.ISQSMessage): Promise<boolean> {
	return await sendToSNS(data, msgArn);
}

/**
 * Forwards a group of messages to AWS SNS for storage in the SQS and then processing by the Lambda function
 * 
 * @param {ISQSMessage[]} data The messages to be sent to AWS
 * 
 * @returns {Promise<boolean>} Whether the messages were successfully sent to AWS
 */
async function sendMessagesToSNS(data: archivord.aws.ISQSMessage[]): Promise<boolean> {
	return await sendToSNS(data, msgArn);
}

export { sendMessageToSNS, sendMessagesToSNS };