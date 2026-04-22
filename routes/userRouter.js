import { Router } from "express";
import * as userController from '../controllers/userController.js';
const userRouter = Router();

userRouter.get('/sign-up', userController.createUserGet);
userRouter.post('/sign-up', userController.createUserPost);
userRouter.get('/log-in', userController.userLoginGet);
userRouter.post('/log-in', userController.userLoginPost);
userRouter.get("/log-out", userController.userLogOutGet);
export default userRouter;