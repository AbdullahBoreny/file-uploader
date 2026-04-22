import { prisma } from '../ORM/lib/prisma.js';

import passport from "passport";
import initPassport from "../service/pass.js";
import { validateUser } from '../service/userService.js';
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
initPassport();
export const verifyUser = (req, res, next) => {

    if (!req.user) {
        const error = [
            { msg: "please sign in" }
        ];

        res.status(401).json({ error });

        return;
    }
    next();
};
export const userLoginGet = (req, res) => {


    const errors = req.session.messages;

    req.session.messages = [];
    res.render("login_form", { user: req.user, errors: errors });

};


export const userLogOutGet = (req, res, next) => {

    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/users/log-in");
    });
};

export const createUserPost = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("sign_form", {
                title: "Create user",
                errors: errors.array(),
            });

        }
        let { name, password } = matchedData(req);

        password = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                password,
            },
        });
        res.redirect("/users/log-in");


    }
];

export const createUserGet = (req, res) => {

    res.render("sign_form");
};
export const userLoginPost =
    passport.authenticate("local", {

        successRedirect: "/users/log-in",
        failureRedirect: "/users/log-in",
        failureMessage: true
    });
