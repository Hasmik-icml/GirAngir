import { Request, Response } from "express";
import { VocabularyService } from "../services/vocabulary.service";
import getOrderParams from "../helpers/order-params.helper";
import getFilterParams from "../helpers/filters-params.helper";
import { CustomError } from "../errors/custom.error";

export class VocabularyController {
    public static async createNewContent(req: Request, res: Response) {
        const { content, languageId } = req.body;
        const userId = (req as any).userId;
        try {
            const newContent = await VocabularyService.create(content, languageId, userId);
            res.status(200).send(newContent);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ errors: error.serializeErrors() });
            } else {
                res.status(400).send({ message: 'Something went wrong' });
            }
        }
    }

    public static async createTranslation(req: Request, res: Response) {
        const userId = (req as any).userId;
        const { contentIds } = req.body;

        try {
            const translationCreated = await VocabularyService.translation(contentIds, userId);
            res.status(200).send(translationCreated);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ errors: error.serializeErrors() });
            } else {
                res.status(400).send({ message: 'Something went wrong' });
            }
        }
    }

    public static async getAllContents(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;
            // const groupBy = req.query.groupBy as string;

            const { orderField, order } = getOrderParams(req);
            const filters = getFilterParams(req);

            const [data, count] = await VocabularyService.findAll(page, limit, orderField, order, filters);
            res.status(200).send({ data, count });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching contents' });
        }
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        const userId = (req as any).userId;
        const id = req.params.id;
        try {
            const [data, count] = await VocabularyService.findOne(id, userId);
            res.status(200).send({ data, count });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching contents' });
        }
    }

    public static async updateContent(req: Request, res: Response): Promise<void> {
        const { content } = req.body;
        const { contentId } = req.params;
        const userId = (req as any).userId;

        try {
            const updatedContent = await VocabularyService.update(content, contentId, userId);
            res.status(200).send(updatedContent);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ errors: error.serializeErrors() });
            } else {
                res.status(400).send({ message: 'Something went wrong' });
            }
        }
    }

    public static async deleteContent(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {

        }
    }
}