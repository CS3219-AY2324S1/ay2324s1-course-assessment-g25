/**
 * This is the entry point of the backend.
 * It will start the server, set up the routes, and connect to the database.
 * 
 * @author Fang Yiye
 * @author Lin Leyi
 * @author Tan Yong Feng Deon
 * 
 * @version 1.0.0
 * @date 2023-09-07
 * 
 * @requires dotenv
 * @requires express
 * 
 * To start the server, run `npm start` in the backend folder.
 * 
 * Note: This file assumes that the database is already set up and running.
 * Make sure to check the environment variables in `.env` and configure the 
 * database connection accordingly before starting the server.
 */

import 'dotenv/config';
import './data-sources/mongoose/connection.js';

import express from 'express';
import questionRouter from './api/v1/questionRouter.js';

// Create an express app
const app = express();

// Configure the app to parse requests with JSON payloads
app.use(express.json());

// Prepare a port for the server to listen on
const PORT = process.env.PORT || 3000;

// Configure the app to listen on the port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Configure the app to respond to the status endpoint with a JSON object
app.get('/api/v1/status', (req, res) => {
  // Create a JSON object to send as a response
  const status = {
    "Status": "Running"
  };

  // Send the JSON object as a response
  res.json(status);
});

// Configure the app to use the question router
app.use('/api/v1/questions', questionRouter); 