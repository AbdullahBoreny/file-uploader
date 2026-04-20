import { prisma } from '../ORM/lib/prisma.js';

import passport from "passport";
import initPassport from "./pass.js";
import { validateUser } from './userService.js';
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
initPassport();
export const verifyUser = (req, res, next) => {

    if (!req.user) {
        const error = [
            { msg: "please sign in" }
        ];

        res.render("sign_form", { errors: error });

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
        res.redirect("/log-in");
    });
};

export const createUserPost = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).render("sign_form", {
                title: "Create user",
                errors: errors.array(),
            });
            return;
        }


        let { name, password } = matchedData(req);

        password = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                password,
            },
        });
        res.redirect("/log-in");


    }
];

export const createUserGet = (req, res) => {

    res.render("sign_form");
};
export const userLoginPost =
    passport.authenticate("local", {

        successRedirect: "/log-in",
        failureRedirect: "/log-in",
        failureMessage: true
    });