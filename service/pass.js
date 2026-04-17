import passport from 'passport';
import { prisma } from '../ORM/lib/prisma.js';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

export default function initPassport() {

    passport.use(
        new LocalStrategy(async (name, password, done) => {
            try {
                const err = 'Incorrect username or password';
                const user = await prisma.user.findUnique({
                    where: { name },
                });

                if (!user) {
                    return done(null, false, { message: err });
                }

                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    return done(null, false, { message: err });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
            });
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}