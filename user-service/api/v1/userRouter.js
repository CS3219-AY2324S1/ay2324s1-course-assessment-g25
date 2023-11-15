import {
    deleteUser,
    updateUser
} from '../../controllers/UserController.js';

import express from 'express';

const userRouter = express.Router();

// Handle PUT requests to /api/v1/users/:userId
userRouter.put('/:email', updateUser);

// Handle DELETE requests to /api/v1/users/:userId
userRouter.delete('/:id', deleteUser);



export default userRouter;
