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
import client from './service/redis.js';
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
app.get('/version', (req, res) => res.send("1"));
app.get('/redis', async (req, res) => {

    let count = await client.get("count");
    res.json(count);
}
);
app.use('/upload', verifyUser, routes.uploadRouter);
app.use('/users', routes.userRouter);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}/`);
});
app.get('/health', (req, res) => {
    res.send('ok');
});

export { app };