import express from "express";
const app = express();
import passport from "passport";
import path from "node:path";
import morgan from "morgan";
import cors from 'cors';
import expressSession from "express-session";
import "dotenv/config";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from "./ORM/lib/prisma.js";
app.use(express.static(path.join(import.meta.dirname, "public")));

import { verifyUser } from "./controllers/userController.js";
import routes from "./routes/routes.js";
import expressEjsLayouts from "express-ejs-layouts";
app.use(express.json());
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
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
app.use(expressEjsLayouts);
app.set("layout", "layouts/layout");
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/',
    (req, res) => {
        res.render('hello');
    });
app.use('/upload', verifyUser, routes.uploadRouter);
app.use('/users', routes.userRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Backend running on http://localhost:${process.env.PORT}/ ${process.env.PORT}`);
});


export { app };