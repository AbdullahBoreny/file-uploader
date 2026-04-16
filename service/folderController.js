import { prisma } from '../ORM/lib/prisma.js';

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
    try {
        await prisma.folder.create({
            data: {
                name: name,
            }
        });
        res.render("/folder");
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
            select: { files: true, id: true, name: true }

        });
        res.render("folder_files", { folder: folder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};