import { Router } from "express";
import { body, param } from "express-validator";
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
            body("isNative")
                .optional()
                .isBoolean().withMessage("isNative must be a boolean value")
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
        LanguageController.updateLanguage,
    )
    .delete("/:id",
        [
            param("id")
                .notEmpty().withMessage("Id must be provided")
                .isUUID().withMessage("Id must be UUID"),
        ],
        validateRequest,
        LanguageController.deleteLanguage,
    )
export { router as languageRouter };