import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    public static async signUp(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        const result = await AuthService.signUp(name, password, email);
        res.status(201).send(result);

    }
}
