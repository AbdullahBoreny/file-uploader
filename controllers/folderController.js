import { matchedData, validationResult } from 'express-validator';
import { prisma } from '../ORM/lib/prisma.js';
import * as userService from '../service/userService.js';
export const createFolderGet = async (req, res) => {
    try {
        const folders = await prisma.folder.findMany(
            {
                where: { userId: req.user.id },
                select: { name: true, id: true }
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
    userService.validateFolder,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                return res.render("create_folder", { errors: errors.array() });
            }
            const { folder } = matchedData(req);

            const name = folder;
            const result = await prisma.folder.create({
                data: {
                    name: name,
                    userId: req.user.id
                }
            });
            res.redirect(`/folder/${result.id}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "couldn't create folder error" });
        }
    }
];
export const folderContentGet = async (req, res) => {
    const { id } = req.params;

    const folder = await prisma.folder.findUnique({
        where: { id: Number(id), userId: req.user.id },
        select: { files: true, id: true, name: true }
    });

    if (!folder) {
        res.render('create_folder', { err: "not found" });
        return;
    }

    res.render("folder_files", { folder });
};
export const removeFolderPost = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await prisma.folder.delete({
            where: { id: Number(id), userId: req.user.id }
        });
        res.locals.deleteMessage = `${result.name} deleted successfully`;
        console.log(res.locals.deleteMessage);
        res.redirect("/folder");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "couldn't delete folder" });
    }
};