import multer from "multer";
import { createClient } from '@supabase/supabase-js';
import "dotenv/config";
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

        console.log("Uploaded:", data);

        next();
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const uploadFilesPost = [
    upload.single('avatar'),
    uploadMiddleWare,
    (req, res) => {
        try {
            console.log(req.file);
            res.json(req.file);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "cant upload error" });
        }
    }
];

export const uploadFilesGet = async (req, res) => {

    try {
        res.render("upload");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "cant render upload error" });
    }
};