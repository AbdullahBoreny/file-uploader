import { Router } from "express";
import { uploadFilesPost, } from "../service/uploadController.js";
import { createFolderGet, createFolderPost, folderContentGet } from "../service/folderController.js";
import { verifyUser } from "../service/userController.js";
const uploadRouter = Router();
uploadRouter.post('/:id/upload', verifyUser, uploadFilesPost);
uploadRouter.get('/folder', verifyUser, createFolderGet);
uploadRouter.post('/folder', verifyUser, createFolderPost);
uploadRouter.get("/folder/:id", verifyUser, folderContentGet);

export default uploadRouter;