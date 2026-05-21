import { matchedData, validationResult } from 'express-validator';
import { prisma } from '../ORM/lib/prisma.js';
import * as userService from '../service/userService.js';
import client from '../service/redis.js';

export const createFolderGet = async (req, res) => {
    try {
        const message = req.session.deleteMessage;
        const errors = req.session.errors;

        req.session.deleteMessage = null;
        req.session.errors = null;

        const folders = await prisma.folder.findMany({
            where: { userId: req.user.id },
            select: { name: true, id: true }
        });

        res.render('create_folder', {
            folders,
            message,
            errors
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "couldn't view folders"
        });
    }
};

export const createFolderPost = [
    userService.validateFolder,

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                req.session.errors = errors.array();
                return res.redirect('/upload/folder');
            }

            const { folder } = matchedData(req);

            const result = await prisma.folder.create({
                data: {
                    name: folder,
                    userId: req.user.id
                },
                select: {
                    id: true,
                    name: true,
                    files: true
                }
            });

            const cacheKey = `folder:${req.user.id}:${result.id}`;

            await client.set(
                cacheKey,
                JSON.stringify(result),
                {
                    expiration: {
                        type: 'EX',
                        value: 3600
                    }
                }
            );

            res.redirect(`/upload/folder/${result.id}`);

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "couldn't create folder"
            });
        }
    }
];

export const folderContentGet = async (req, res) => {
    try {
        const { id } = req.params;

        const cacheKey = `folder:${req.user.id}:${id}`;

        const cache = await client.get(cacheKey);

        if (cache) {
            console.log('served from cache');

            return res.render(
                'folder_files',
                { folder: JSON.parse(cache) }
            );
        }

        const folder = await prisma.folder.findFirst({
            where: {
                id: Number(id),
                userId: req.user.id
            },
            select: {
                files: true,
                id: true,
                name: true
            }
        });

        if (!folder) {
            return res.render('create_folder', {
                err: 'not found'
            });
        }

        await client.set(
            cacheKey,
            JSON.stringify(folder),
            {
                expiration: {
                    type: 'EX',
                    value: 3600
                }
            }
        );

        res.render('folder_files', { folder });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "couldn't get folder"
        });
    }
};

export const removeFolderPost = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await prisma.folder.delete({
            where: {
                id: Number(id)
            }
        });

        // DELETE CACHE
        const cacheKey = `folder:${req.user.id}:${id}`;

        await client.del(cacheKey);

        req.session.deleteMessage =
            `${result.name} deleted successfully`;

        res.redirect('/upload/folder');

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "couldn't delete folder"
        });
    }
};