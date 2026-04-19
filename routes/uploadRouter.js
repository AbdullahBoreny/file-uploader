import { Router } from "express";
import { folderContentPost, fileLinkGet, fileDownloadGet } from "../controllers/uploadController2.js";
import { createFolderGet, createFolderPost, folderContentGet, removeFolderPost } from "../controllers/folderController.js";
import { verifyUser } from "../service/userController.js";
const uploadRouter = Router();

uploadRouter.get('/folder', verifyUser, createFolderGet);
uploadRouter.post('/folder', verifyUser, createFolderPost);
uploadRouter.post('/:id/folder/delete', verifyUser, removeFolderPost);

uploadRouter.get("/folder/:id", verifyUser, folderContentGet);
uploadRouter.post("/folder/:id", verifyUser, folderContentPost);
uploadRouter.get('/file/:fileId/link', verifyUser, fileLinkGet);
uploadRouter.get('/file/:fileId/download', verifyUser, fileDownloadGet);

export default uploadRouter;