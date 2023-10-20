/**
 * User Router
 * 
 * This file contains the routes for the User API endpoints.
 * 
 * @module backend/api/v1/questionRouter
 * 
 * @requires express
 * @requires backend/controllers/QuestionController
 */

import express from 'express';
// import { user } from 'pg/lib/defaults.js';
import {getUsers, createUser, getUserById, updateUser, deleteUser, getUserByEmail} from '../../controllers/UserController.js'; 

const userRouter = express.Router();

// Handle GET requests to /api/v1/users
userRouter.get('/', getUsers);

// Handle POST requests to /api/v1/users
userRouter.post('/',  createUser);

// Handle GET requests to /api/v1/users/:userId
userRouter.get('/:userId', getUserById);

// Handle GET requests to /api/v1/users/:email
userRouter.get('/byEmail/:email', getUserByEmail);

// Handle PUT requests to /api/v1/users/:userId
userRouter.put('/:userId', updateUser);

// Handle DELETE requests to /api/v1/users/:userId
userRouter.delete('/:userId', deleteUser);

// IRRELEVANT code that renders to the ejs views 
/* 
userRouter.get('/login', (req, res) => {
    res.render("login.ejs");
});

userRouter.get('/dashboard', (req, res) => {
    res.render("dashboard.ejs", { user: 'to leyi: u can write a getuser to get user name' }); 
}) 

userRouter.get('/register', (req, res) => {
    res.render("register.ejs");
})

userRouter.post('/register', registerUser); */ 

export default userRouter;


