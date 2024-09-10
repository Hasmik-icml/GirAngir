import { Router } from "express";
import { authRouter } from "./auth.routes";
import { languageRouter } from "./language.router";

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/languages', languageRouter);

export { router as router };