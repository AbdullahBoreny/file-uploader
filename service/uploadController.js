import multer from "multer";
import { createClient } from '@supabase/supabase-js';
import "dotenv/config";
import { prisma } from '../ORM/lib/prisma.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @ts-ignore
const supabase = createClient(process.env["SUB_URL"], process.env["SUB_KEY"]);


export const uploadMiddleWare = async (req, res, next) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send("No file uploaded");
        }

        const fileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");

        const { data, error } = await supabase
            .storage
            .from("boreny")
            .upload(`uploads/${fileName}`, file.buffer, {
                contentType: file.mimetype,
                upsert: true,
            });

        if (error) {
            console.log("Upload error:", error);
            return res.status(500).send(error.message);
        }


        next();
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
export const saveFile = async (req, res, next) => {
    const { id } = req.params;
     const fileName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    console.log("supposed to be an id of a folder", id);
    const { data } = await supabase
        .storage
        .from('boreny')
        .getPublicUrl(`uploads/${fileName}`);
    try {
        await prisma.file.create({
            data: {
                link: data.publicUrl,
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
export const folderContentPost = [
    upload.single('avatar'),
    uploadMiddleWare,
    saveFile,
    (req, res) => {
        try {
            const { id } = req.params;
            res.redirect(`/folder/${id}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "cant upload error" });
        }
    }
];

