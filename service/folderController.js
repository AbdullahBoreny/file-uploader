import { body, matchedData, validationResult } from 'express-validator';
import { prisma } from '../ORM/lib/prisma.js';

export const createFolderGet = async (req, res) => {
    try {
        const folders = await prisma.folder.findMany(
            {
                where: { userId: req.user.id },
                select: { name: true }
            }
        );
        console.log(folders);
        res.render('create_folder', { folders: folders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "couldn't vew folder form error" });
    }
};
export const createFolderPost = [
    async (req, res) => {
        try {
            const name = req.body.folder;
            const folder = await prisma.folder.create({
                data: {
                    name: name,
                    userId: req.user.id
                }
            });
            res.redirect(`/folder/${folder.id}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "couldn't create folder error" });
        }
    }
];

export const folderContentGet = async (req, res) => {
    const { id } = req.params;
    try {
        const folder = await prisma.folder.findFirst({
            where: { id: Number(id) },
            select: { files: true, id: true, name: true }

        });
        console.log(folder);
        res.render("folder_files", { folder: folder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};