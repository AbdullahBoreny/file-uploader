import { Router } from "express";
import { uploadFilesGet, uploadFilesPost, } from "./service/uploadController.js";
import { createFolderGet, createFolderPost, folderContentGet } from "./folderController.js";
import { verifyUser } from "./service/userController.js";
const uploadRouter = Router();
uploadRouter.get('/upload', verifyUser, uploadFilesGet);

uploadRouter.post('/upload', verifyUser, uploadFilesPost);
uploadRouter.get('/folder', verifyUser, createFolderGet);
uploadRouter.post('/folder', verifyUser, createFolderPost);
uploadRouter.get("/folder/:id", verifyUser, folderContentGet);

export default uploadRouter;