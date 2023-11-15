/**
 * This is the entry point for the user service.
 * It uses the express package to create API endpoints.
 * It also handles the database connection to postgresql on GCP.
 * 
 * Before starting this service, setup the environment variables in `.env`
 * To start the service, run `npn run dev`
 */

import 'dotenv/config.js';

import cors from 'cors';
import express from 'express';
//import userRouter from './api/v1/userRouter.js';

// Create an express app
const app = express();

// Configure the app to use EJS as the templating engine
app.set("view engine", "ejs");

// Configure the app to use CORS
app.use(cors());

// Configure the app to parse requests with JSON payloads
app.use(express.json());

// Configure the app to parse requests with URL encoded payloads
app.use(express.urlencoded({ extended: false }));

// Configure the app to use the user router for all requests to /api/v1/users
//app.use('/api/v1/users', userRouter);

// Configure the app to use the defined port or 8080
const PORT = process.env.PORT || 8080;

// Start the app listening on the defined port
app.listen(PORT, () => {
  console.log(`User-Service listening on port ${PORT}`);
});

// Configure the service to respond to service status requests
app.get('/api/v1/status', (req, res) => {
  res.json({ "Status": "Running" });
});
