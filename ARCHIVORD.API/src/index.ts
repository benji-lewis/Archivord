const { onRequest } = require('firebase-functions/v2/https');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
