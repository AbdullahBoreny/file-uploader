import { Router } from "express";
import { uploadFilesGet, uploadFilesPost } from "./uploadController.js";
import { verifyUser } from "./service/userController.js";
const uploadRouter = Router();
uploadRouter.get('/upload', verifyUser, uploadFilesGet);
uploadRouter.post('/upload', uploadFilesPost);

export default uploadRouter;