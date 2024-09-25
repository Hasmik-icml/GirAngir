import { Router } from "express";
import { body, param, query } from "express-validator";
import { authMiddleware } from "../middleware/auth.middleware";
import { VocabularyController } from "../controller/vocabulary.controller";
import { validateRequest } from "../middleware/validation.middleware";

const router: Router = Router();

router.use(authMiddleware);

router
    .post("/create",
        [
            body("content")
                .notEmpty().withMessage("Content must be provided")
                .isString().withMessage("Content must be string")
                .escape(),
            body("languageId")
                .notEmpty().withMessage("LanguageId must be provided")
                .isUUID().withMessage("LanguageId must be UUID"),
        ],
        validateRequest,
        VocabularyController.createNewContent
    )
    .post("/create-translation",
        [
            body("contentIds")
                .notEmpty().withMessage("Content must be provided")
                .isArray().withMessage("Content must be Array")
                .custom((value) => {
                    return Array.isArray(value) && value.every(Number.isInteger);
                }),
        ],
        validateRequest,
        VocabularyController.createTranslation
    )
    .get('/all',
        [
            query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
            query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
            query('orderBy').optional().isIn(['id', 'createdAt', 'updatedAt', 'language']).withMessage('Order must be "id", "createdAt", "updatedAt", "language"'),
        ],
        validateRequest,
        VocabularyController.getAllContents
    )
    .put("/edit/:id",
        [
            body("content")
                .optional()
                .isString().withMessage("Content must be string")
                .escape(),
            body("languageId")
                .optional()
                .isUUID().withMessage("LanguageId must be UUID"),
            body("translations-from")
                .optional()
                .isUUID().withMessage("IdFrom must be UUID"),
            body("translations-to")
                .optional()
                .isUUID().withMessage("IdTo must be UUID"),
        ],
        validateRequest,
        VocabularyController.updateContent
    )
    .delete("/delete/:id",
        [
            param("id")
                .notEmpty().withMessage("Id must be provided")
                .isUUID().withMessage("Id must be UUID"),
        ],
        validateRequest,
        VocabularyController.deleteContent
    )


export { router as vocabularyRouter }