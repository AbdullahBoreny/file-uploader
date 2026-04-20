import { Router } from "express";
import { folderContentPost, fileLinkGet, fileDownloadGet } from "../controllers/uploadController2.js";
import { createFolderGet, createFolderPost, folderContentGet, removeFolderPost } from "../controllers/folderController.js";
const uploadRouter = Router();
uploadRouter.get('/folder', createFolderGet);
uploadRouter.post('/folder', createFolderPost);
uploadRouter.post('/:id/folder/delete', removeFolderPost);
uploadRouter.get("/folder/:id", folderContentGet);
uploadRouter.post("/folder/:id", folderContentPost);
uploadRouter.get('/file/:fileId/link', fileLinkGet);
uploadRouter.get('/file/:fileId/download', fileDownloadGet);

export default uploadRouter;