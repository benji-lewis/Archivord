// SPDX-FileCopyrightText: 2024 Ben Lewis <oss@benjilewis.dev>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import * as admin from 'firebase-admin';
import { Firestore, Timestamp, FieldValue } from '@google-cloud/firestore';
import { resolve } from 'path';
import { config } from 'dotenv';

config({
	path: resolve(__dirname, '../../.env')
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../../serviceAccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const db = new Firestore({
	projectId: process.env.projectId,
	keyFilename: resolve(__dirname, '../../serviceAccount.json')
});

export { admin, db, Timestamp, FieldValue };