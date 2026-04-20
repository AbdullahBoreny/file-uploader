import { body } from "express-validator";
import { prisma } from "../ORM/lib/prisma.js";

export const validateUser = [
    // --- Name Validation ---
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3, max: 30 }).withMessage("Name must be between 3 and 30 characters")
        .custom(async (value) => {
            const user = await prisma.user.findUnique({ where: { name: value } });
            if (user) throw new Error("Username already taken");
            return true;
        }),

    // body("email")
    //     .trim()
    //     .exists().withMessage("Email field required")
    //     .isEmail().withMessage("Please provide a valid email address")
    //     .normalizeEmail()
    //     .custom(async (value) => {
    //         const user = await prisma.user.findUnique({ where: { email: value } });
    //         // FIXED: If user exists, throw error. If not, proceed.
    //         if (user) throw new Error("Email already in use");
    //         return true;
    //     }),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/\d/).withMessage("Password must contain at least one number")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter"),

    // --- Password Confirmation ---
    body("passwordConfirm")
        .trim()
        .exists().withMessage("Please confirm your password")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            console.log("im here?");
            return true;
        })
];

export const validateFolder = [
    body("folder")
        .notEmpty().withMessage("cant be empty")
        .custom(async (value, { req }) => {
            const folder = await prisma.folder.findFirst({ where: { name: value, userId: req.user.id } });
            console.log(folder);
            if (folder) throw new Error("Folder already exist");
            return true;
        }),
];