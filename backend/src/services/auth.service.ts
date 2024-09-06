import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { BadRequestError } from "../handlers/bad-request.handler";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

interface IUser {
    id: string;
    email: string;
    name: string | null;
}

interface ITokens {
    accessToken: string;
    refreshToken: string;
}

const secretKey = process.env.JWT_SECRET_KEY || "";
const refresh_key = process.env.JWT_REFRESH_KEY || "";

export class AuthService {
    private static prismaClient = new PrismaClient();

    private static get userRepo() {
        return this.prismaClient.user;
    }

    private static get refreshTokenRepo() {
        return this.prismaClient.refreshToken;
    }

    public static async signUp(userName: string, password: string, email: string): Promise<IUser | undefined | Error> {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const selectFields = { "id": true, "email": true, "name": true };

        const user: User | null = await this.userRepo.findUnique({ where: { email } });
        if (user) {
            throw new BadRequestError("User already exists");
        }
        const userCreated: IUser = await this.userRepo.create({
            data: {
                name: userName,
                email: email,
                password: hashedPassword,
            },
            select: selectFields,
        });
        return userCreated;
    }

    public static async signIn(email: string, password: string): Promise<ITokens | undefined> {
        const user = await this.userRepo.findUnique({ where: { email } });
        if (!user) {
            throw new BadRequestError("Invalid email or password");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new BadRequestError("Invalid email or password");
        }
        await this.refreshTokenRepo.deleteMany({
            where: { userId: user.id }
        });

        const accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            secretKey!,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { userId: user.id, email: user.email },
            refresh_key!,
            { expiresIn: '1d' }
        );

        await this.refreshTokenRepo.create({
            data: {
                userId: user.id,
                token: refreshToken,
            },
        });

        return { accessToken, refreshToken };
    }

    public static async refreshToken(refreshToken: string): Promise<ITokens | undefined> {
        try {
            const decoded = jwt.verify(refreshToken, refresh_key!) as { userId: string, email: string };
            const user = await this.userRepo.findUnique({
                where: { id: decoded.userId },
            });

            if (!user) {
                throw Error('User not found');
            }

            const tokenExists = await this.refreshTokenRepo.findFirst({
                where: {
                    userId: user.id,
                    token: refreshToken,
                },
            });

            if (!tokenExists) {
                throw new Error('Invalid Refresh Token');
            }

            await this.refreshTokenRepo.deleteMany({
                where: {
                    userId: user.id,
                    token: refreshToken,
                },
            })

            const accessToken = jwt.sign(
                { userId: user.id, email: user.email },
                secretKey!,
                { expiresIn: '15m' }
            );
            const newRefreshToken = jwt.sign(
                { userId: user.id, email: user.email },
                refresh_key!,
                { expiresIn: '1d' }
            );

            await this.refreshTokenRepo.create({
                data: {
                    userId: user.id,
                    token: refreshToken,
                },
            });

            return { accessToken, refreshToken: newRefreshToken };
        } catch (error) {
            console.log(error);
        }
    }

}