import { Router } from "express";
import * as userController from './userController.js';
const indexRouter = Router();

indexRouter.get('/sign-up', userController.createUserGet);
indexRouter.post('/sign-up', userController.createUserPost);
indexRouter.get('/log-in', userController.userLoginGet);
indexRouter.post('/log-in', userController.userLoginPost);
indexRouter.get("/log-out", userController.userLogOutGet);


export default indexRouter;