import express from "express";
const app = express();
import passport from "passport";
import path from "node:path";
import morgan from "morgan";
import expressSession from "express-session";
import "dotenv/config";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from "./ORM/lib/prisma.js";

import indexRouter from "./router.js";
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


app.use(indexRouter);

app.listen(2000, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend running on port ${2000}`);
});


export { app };