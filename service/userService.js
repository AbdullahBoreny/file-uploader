import { body } from "express-validator";
export const validateUser = [
    body("name"),
    body("email"),
    /*       .exists()
           .withMessage("Email field required")
           .isEmail()
           .withMessage("please provide a valid email address")
           .normalizeEmail()
           .custom(async value => {
               const user = await userRepo.findUserByEmail(value);
   
               if (user) {
                   throw new Error('E-mail already in use');
               }
           }),
           */
    body("password"),
    body("passwordConfirm")
        .exists()

        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Password  doesn't match"),
    body("is_admin")
];
/*export const validateUserMessage = [
    body("text")
        .notEmpty()
        .withMessage("empty message aren't allowed")
        .trim()
];
*/