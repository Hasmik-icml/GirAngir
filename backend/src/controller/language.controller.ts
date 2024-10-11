import { Request, Response } from "express";
import { LanguageService } from "../services/language.service";
import { Language } from "@prisma/client";
import { body } from "express-validator";
import { CustomError } from "../errors/custom.error";

export class LanguageController {
    public static async createNewLanguage(req: Request, res: Response) {
        const { name, isNative } = req.body;
        const userId = (req as any).userId;

        try {
            const languageCreated: Language = await LanguageService.create(name, isNative, userId);
            res.status(200).send(languageCreated);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ errors: error.serializeErrors() });
            } else {
                res.status(400).send({ message: 'Something went wrong' });
            }
        }
    }

    public static async getAllLanguages(req: Request, res: Response) {
        const userId = (req as any).userId;
        try {
            const [languages, count] = await LanguageService.getAll(userId);
            res.status(200).send({ languages, count });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public static async upadateLanguage(req: Request, res: Response) {
        const { name } = req.body;
        const { id } = req.params;

        try {
            const updatedLanguage = await LanguageService.update(id, name);
            res.status(200).send(updatedLanguage);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ errors: error.serializeErrors() });
            } else {
                res.status(400).send({ message: 'Something went wrong' });
            }
        }
    }

    public static async deleteLanguage(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const deletedLanguage = await LanguageService.delete(id);
            res.status(200).send(deletedLanguage);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ errors: error.serializeErrors() });
            } else {
                res.status(400).send({ message: 'Something went wrong' });
            }
        }

    }
}