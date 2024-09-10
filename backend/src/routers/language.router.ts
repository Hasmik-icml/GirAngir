import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middleware/auth.middleware";
import { LanguageController } from "../controller/language.controller";
import { validateRequest } from "../middleware/validation.middleware";

const router: Router = Router();

router.use(authMiddleware);

router
    .post("/create",
        [
            body("name")
                .notEmpty().withMessage("Name must be provided")
                .isString().withMessage("Name must be string")
                .escape(),
        ],
        validateRequest,
        LanguageController.createNewLanguage,
    )
    .get("/all-languages",
        validateRequest,
        LanguageController.getAllLanguages,
    )
    .put("/edit/:id",
        [
            body("name")
                .notEmpty().withMessage("Name must be provided")
                .isString().withMessage("Name must be string")
                .escape(),
        ],
        validateRequest,
        LanguageController.upadateLanguage,
    )
    .delete("/:id",
        validateRequest,
        LanguageController.deleteLanguage,
    )
export { router as languageRouter };