import express from "express";
const app = express();
import passport from "passport";
import path from "node:path";
import morgan from "morgan";
import expressSession from "express-session";
import "dotenv/config";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from "./ORM/lib/prisma.js";

import userRouter from "./userRouter.js";
import uploadRouter from "./uploadRouter.js";
app.use(express.json());
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000 // ms
        },
        secret: 'a santa at nasa',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            prisma,
            {
                checkPeriod: 2 * 60 * 1000,  //ms
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    })
);
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
};
app.use(uploadRouter);
app.use(userRouter);
app.use(errorHandler);
app.listen(2001, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend running on port ${2001}`);
});


export { app };