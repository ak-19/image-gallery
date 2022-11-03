import express from 'express';

import { userSignIn, userSignUp } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.post('/signin', userSignIn)
userRouter.post('/signup', userSignUp)

export default userRouter;