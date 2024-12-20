import { Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validation.middleware";
import { AuthController } from "../controller/auth.controller";

const router: Router = Router();

router
    .post('/signup',
        [
            body('name')
                .trim()
                .escape()
                .isLength({ min: 3, max: 25 }).withMessage("Username must be between 3 and 25 characters long")
                .isAlphanumeric().withMessage("Username must consist of letters and numbers")
                .not().isNumeric().withMessage("Username should not consist of only numbers"),
            body('email')
                .trim()
                .escape()
                .isEmail().withMessage("Please provide a valid email address"),
            body('password')
                .trim()
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }).withMessage("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbole"),
        ],
        validateRequest,
        AuthController.signUp
    )
    .post('/signin',
        [
            body('email').trim().escape().isEmail().withMessage("Invalid email or password"),
            body('password')
                .trim()
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }).withMessage("Invalide email or password"),
        ],
        validateRequest,
        AuthController.signIn
    )
    .post('/refresh-token', AuthController.refreshToken)

export { router as authRouter };