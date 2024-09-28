import { Request } from "express";
import { IOrderParams } from "../services/vocabulary.service";

export default function getOrderParams(req: Request): IOrderParams {
    const orderBy = (req.query.orderBy as string) || 'id';
    if (orderBy.startsWith('-')) {
        return { orderField: orderBy.slice(1), order: 'desc' };
    } else {
        return { orderField: orderBy, order: "asc" };
    }
}