/**
 * Mongoose connection
 * 
 * This file sets up the connection to the database using Mongoose.
 * 
 * @module backend/data-sources/mongoose/connection
 * 
 * @requires dotenv
 * @requires mongoose
 * 
 */

import 'dotenv/config';

import mongoose from 'mongoose';

// Connect to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(err);
});