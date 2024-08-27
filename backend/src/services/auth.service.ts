import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { BadRequestError } from "../handlers/bad-request.handler";
import { User } from "@prisma/client";

interface IUser {
    id: string;
    email: string;
    name: string | null;
}

export class AuthService {
    private static prismaClient = new PrismaClient();

    private static get repo() {
        return this.prismaClient.user;
    }
    public static async signUp(userName: string, password: string, email: string): Promise<IUser | undefined | Error> {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const selectFields = { "id": true, "email": true, "name": true };

        const user: User | null = await this.repo.findUnique({ where: { email } });
        if (user) {
            throw new BadRequestError("User already exists");
        }
        const userCreated: IUser = await this.repo.create({
            data: {
                name: userName,
                email: email,
                password: hashedPassword,
            },
            select: selectFields,
        });
        return userCreated;
    }

}