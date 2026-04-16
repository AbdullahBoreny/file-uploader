import { prisma } from './ORM/lib/prisma.js';

export const createFolderGet = async (req, res) => {
    try {
        res.render('create_folder');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "couldn't vew folder form error" });
    }
};
export const createFolderPost = async (req, res) => {
    const name = req.body.folder;
    console.log(name);
    try {
        await prisma.folder.create({
            data: {
                name: name,
            }
        });
        res.redirect("/folder");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "couldn't create folder error" });
    }
};
export const folderContentGet = async (req, res) => {
    const { id } = req.params;
    try {
        const folder = await prisma.folder.findFirst({
            where: { id: Number(id) },
            select: { files: true }

        });
        console.log(folder);
        res.render("folder_files", { folder: folder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};