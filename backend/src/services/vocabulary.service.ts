import { Language, Prisma, PrismaClient, Vocabulary } from '@prisma/client';
import translationPairs from '../helpers/translation-pairs.helper';
import { NotFoundError } from '../handlers/not-found.handler';

export interface IOrderParams {
    orderField: string;
    order: 'asc' | 'desc';
}


export interface IVocabularyFilters {
    userId?: string;
    content?: string;
}

export interface IVocabulary extends Vocabulary {
    language: {
        name: string;
    };
}

export class VocabularyService {
    private static prismaClient = new PrismaClient;

    private static get repo() {
        return this.prismaClient.vocabulary;
    }

    private static get translationRepo() {
        return this.prismaClient.translation;
    }

    public static async create(content: string, languageId: string, userId: string): Promise<Vocabulary> {
        try {
            const data = await this.repo.create({
                data: { content, languageId, userId },
            })
            return data;
        } catch (error) {
            throw error;
        }
    }

    public static async translation(contentIds: number[], userId: string): Promise<string[]> {
        const createdTranslationId = [];
        try {
            const translation = translationPairs(contentIds);

            for (const [contentFromId, contentToId] of translation) {
                const createdTranslation = await this.translationRepo.create({
                    data: {
                        contentFrom: {
                            connect: { id: String(contentFromId) }
                        },
                        contentTo: {
                            connect: { id: String(contentToId) }
                        },
                        user: { connect: { id: userId } },
                    }
                });
                createdTranslationId.push(createdTranslation.id);
            }
            console.log(11, createdTranslationId)
            return createdTranslationId;
        } catch (error) {
            console.log(555, error);

            throw error;
        }
    }

    public static async findAll(page: number, limit: number, orderFiled: string, order: string, filters: IVocabularyFilters): Promise<[data: { [key: string]: Vocabulary[] }, count: number]> {
        const skip = (page - 1) * limit;
        const where: any = { deletedAt: null };
        let [data, count]: [data: IVocabulary[], count: number] = [[], 0];

        if (filters.userId) {
            where.userId = filters.userId;
        }

        if (filters.content) {
            where.content = {
                contains: filters.content,
            }
        }
        try {
            [data, count] = await this.prismaClient.$transaction([
                this.repo.findMany({
                    skip,
                    take: limit,
                    where,
                    orderBy: { [orderFiled]: order },
                    include: {
                        language: {
                            select: { name: true }
                        },
                    },
                }),
                this.repo.count({
                    where
                })
            ]);


            const groupedByLanguage = data.reduce((acc: { [key: string]: Vocabulary[] }, item) => {
                const languageName = item.language.name;

                if (!acc[languageName]) {
                    acc[languageName] = [];
                }

                const { language,

                    ...data } = item;

                acc[languageName].push(data);

                return acc;
            }, {})

            return [groupedByLanguage, count];
        } catch (error) {
            console.log(0, error);
            throw error;
        }
    }

    public static async update(content: string, contentId: string, userId: string): Promise<Vocabulary> {
        try {
            const updatedContent = await this.repo.update({
                where: { id: contentId, userId },
                data: { content },
            });

            return updatedContent;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundError('Content not found');
            }
            throw new Error('Error updating Blog');
        }

    }
}