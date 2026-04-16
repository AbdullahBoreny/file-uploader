import { Router } from "express";
import { uploadFilesGet, uploadFilesPost, } from "./service/uploadController.js";
import { createFolderGet, createFolderPost, folderContentGet } from "./folderController.js";
import { verifyUser } from "./service/userController.js";
const uploadRouter = Router();
uploadRouter.get('/upload', verifyUser, uploadFilesGet);
uploadRouter.post('/upload', uploadFilesPost);
uploadRouter.get('/folder', createFolderGet);
uploadRouter.post('/folder', createFolderPost);
uploadRouter.get("/folder/:id", folderContentGet);

export default uploadRouter;