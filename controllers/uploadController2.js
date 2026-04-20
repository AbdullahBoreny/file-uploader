import multer from "multer";
import { createClient } from '@supabase/supabase-js';
import "dotenv/config";
import { prisma } from '../ORM/lib/prisma.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 300 * 1024 } });
const supabase = createClient(process.env["SUB_URL"], process.env["SUB_KEY"]);


export const fileDownloadGet = async (req, res) => {

    const { path } = await prisma.file.findUnique({
        where: { id: Number(req.params.fileId) }
    });

    const { data, error } = await supabase
        .storage
        .from('boreny')
        .download(path);
    const buf = await data.arrayBuffer();

    res.send(Buffer.from(buf));


};



export const uploadRemotely = async (req, res, next) => {
    if (typeof req.file === 'undefined') throw new Error("empty aren't allowed");
    const file = req.file;
    const fileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filePath = `${req.user.name}/${fileName}`;
    req.filePath = filePath;
    const { data, error } = await supabase
        .storage
        .from("boreny")
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
        });
    if (error) {
        console.error("Upload error:", error);
        return res.status(500).json(error.message);
    }

    next();
};
export const fileLinkGet = async (req, res) => {
    const { fileId } = req.params;

    try {
        const data = await prisma.file.findUnique({
            where: { id: Number(fileId) }, select: { path: true }
        });

        const signedUrl = await signUrl(data.path);
        res.redirect(signedUrl);

    } catch (error) {
        console.error(error);
        res.json(error.message);
    }
};
async function signUrl(remotePath) {
    const { data } = await supabase.storage.from('boreny')
        .createSignedUrl(remotePath, 120);

    return data.signedUrl;
}
export const createFile = async (req, res, next) => {
    const { id } = req.params;
    const remotePath = req.filePath;


    try {
        await prisma.file.create({
            data: {
                path: remotePath,
                name: req.file.originalname,
                folderId: Number(id)
            }
        });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const uploadMwChain = [
    upload.single('avatar'),
    uploadRemotely,
    createFile,
    (req, res) => {
        try {
            const { id } = req.params;

            res.redirect(`/upload/folder/${id}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "cant upload error" });
        }
    }];

export const folderContentPost = uploadMwChain;
