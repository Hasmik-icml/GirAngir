import { Language, Prisma, PrismaClient } from "@prisma/client";
import { NotFoundError } from "../handlers/not-found.handler";
import { BadRequestError } from "../handlers/bad-request.handler";

export class LanguageService {
    private static prismaclient = new PrismaClient;

    private static get repo() {
        return this.prismaclient.language;
    }

    public static async create(name: string, userId: string): Promise<Language> {
        try {
            const language = await this.repo.create({
                data: { name, userId },
            })
            if (!language) {
                throw new Error("error");
            }
            return language;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new BadRequestError('Language already exists');
            }
            throw new Error('Error creating blog');
        }
    }

    public static async getAll(userId: string): Promise<[Language[], count: number]> {
        try {
            const [languages, count] = await this.prismaclient.$transaction([
                this.repo.findMany({ where: { deletedAt: null, userId } }),
                this.repo.count({ where: { deletedAt: null, userId } }),
            ]);

            return [languages, count];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public static async update(id: string, name: string) {
        try {
           return this.repo.update({
                where: { id },
                data: { name },
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundError('Language not found');
            }
            throw new Error('Error updating Language');

        }
    }

    public static async delete(id: string): Promise<Language> {
        const existingLanguage = await this.repo.findUnique({
            where: { id },
        });

        if (!existingLanguage) {
            throw new NotFoundError("Language not found");
        }

        const deletedLanguage = await this.repo.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        return deletedLanguage;
    }
}