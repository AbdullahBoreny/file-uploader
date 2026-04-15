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
                files: {
                    create: [{ name: "helloFile" }, { name: "helloFile2" }]
                }
            }
        });
        res.redirect("/folder");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "couldn't create folder error" });
    }
};