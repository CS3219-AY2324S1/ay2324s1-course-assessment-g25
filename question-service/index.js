/**
 * This is the entry point for the question service.
 * It uses the express package to create API endpoints.
 * It also handles the database connection to mongodb on Atlas.
 * 
 * Before starting this service, setup the environment variables in `.env`
 * To start the service, run `npn run dev`
 */

import 'dotenv/config';
import './data-sources/mongoose/connection.js';

import cors from 'cors';
import express from 'express';
import questionRouter from './api/v1/questionRouter.js';

// Create an express app
const app = express();

// Configure the app to use EJS as the templating engine
app.set("view engine", "ejs");

// Configure the app to use CORS
app.use(cors());

// Configure the app to parse requests with JSON payloads
app.use(express.json());

// Configure the app to parse requests with URL encoded payloads
app.use(express.urlencoded({extended: false}));

// Configure the app to use the question router for all requests to /api/v1/questions
app.use('/api/v1/questions', questionRouter); 

// Configure the app to use the defined port or 8084
const PORT = process.env.PORT || 8084;

// Start the app listening on the defined port
app.listen(PORT, () => {
  console.log(`Question-Service listening on port ${PORT}`);
});

// Configure the service to respond to service status requests
app.get('/api/v1/status', (req, res) => {
  res.json({ "Status": "Running" });
});
