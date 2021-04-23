'use strict';

//3RD Party
require('dotenv').config();
const mongoose = require('mongoose'); 

//INTERNAL
const importserver = require('./src/server.js')
const MONGODB_URI = process.env.MONGODB_URI; 
const options = { useNewUrlParser: true, useUnifiedTopology: true } 

mongoose.connect(MONGODB_URI, options).then(importserver.start(process.env.PORT));

