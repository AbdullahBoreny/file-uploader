import multer from "multer";
const upload = multer({ dest: '../uploads' });

export const uploadFilesGet = async (req, res) => {

    try {
        res.render("upload");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "cant render error" });
    }
};
export const uploadFilesPost = [
    upload.single('avatar'),
    async (req, res) => {
        try {
            console.log(req.file);
            res.json(req.file);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "cant upload error" });
        }
    }
];

