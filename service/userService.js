import { body } from "express-validator";
import { prisma } from "../ORM/lib/prisma.js";
export const validateUser = [
    body("name"),
    body("email")
        .exists()
        .withMessage("Email field required")
        .isEmail()
        .withMessage("please provide a valid email address")
        .normalizeEmail()
        .custom(async value => {
            const user = await prisma.user.findUnique({
                where: { name: value }
            });

            if (user) {
                throw new Error('E-mail already in use');
            }
        }),

    body("password"),
    body("passwordConfirm")
        .exists()

        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Password  doesn't match"),
    body("is_admin")
];

export const validateFolder = [
    body("folder")
        .notEmpty()
        .withMessage("cant be empty")
];