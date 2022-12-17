const mongoose = require('mongoose');
const { dbUser, dbPass, dbHost, dbPort, dbName } = require('../app/config.js');
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
const db = mongoose.connection;

module.exports = db;
