import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../errors/custom.error";

export class AuthController {
    public static async signUp(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;
        try {
            const result = await AuthService.signUp(name, password, email);
            res.status(201).send(result);
        } catch (error) {
            if (error instanceof CustomError) {
                console.log("serialaize", error.serializeErrors())
                res.status(error.statusCode).send({ errors: error.serializeErrors() });
            } else {
                res.status(400).send({ message: 'Something went wrong' });
            }
        }
    }
}
