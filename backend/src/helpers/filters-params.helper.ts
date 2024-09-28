import { Request } from 'express';
import { IVocabularyFilters } from '../services/vocabulary.service';


export default function getFilterParams(req: Request): IVocabularyFilters {
    const filters: IVocabularyFilters = {};
    const userId = (req as any).userId;

    if (userId && typeof userId === "string") {
        filters.userId = userId;
    }

    if (req.query.content && typeof req.query.content === 'string') {
        filters.content = req.query.content;
    }
    return filters;
}   