import {onRequest} from 'firebase-functions/v2/https';

import express = require('express');
import cors = require('cors');
const app = express();

app.use(cors());
