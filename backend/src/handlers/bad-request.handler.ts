import { ValidationError } from "express-validator";
import { CustomError } from "../errors/custom.error";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[] | string) {
        super(typeof errors === 'string' ? errors : 'Invalid request parameters');
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): { message: string; field?: string; }[] {
        if (typeof this.errors === 'string') {
            return [{ message: this.errors }];
        } else {
            return [{
                message: this.errors[0].msg,
            }];
        }
    }
}