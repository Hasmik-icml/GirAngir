import { Language, Prisma, PrismaClient, Vocabulary } from '@prisma/client';
import { TranslationPairs } from '../helpers/translation-pairs.helper';
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

    public static async translation(contentIds: string[], userId: string): Promise<string[]> {
        try {
            const existingPairs = (await this.translationRepo.findMany({
                where: {
                    userId,
                    deletedAt: null,
                },
                select: {
                    id: true,
                    contentFromId: true,
                    contentToId: true,
                }
            })).map(pairs => [pairs.id, pairs.contentFromId, pairs.contentToId]);
            
            const newPairs = TranslationPairs.newPairs(contentIds);
            const pairsToRemove = TranslationPairs.pairsToRemove(newPairs, existingPairs);
            const pairsToCreate = TranslationPairs.pairsToCreate(newPairs, existingPairs);

            if (pairsToRemove.length) {
                await this.delete(pairsToRemove, userId);
            }

            const upsertOperations = pairsToCreate.map(([contentFromId, contentToId]) => {
                return this.translationRepo.upsert({
                    where: {
                        contentFromId_contentToId_userId: {
                            contentFromId,
                            contentToId,
                            userId
                        }
                    },
                    create: {
                        contentFrom: { connect: { id: contentFromId } },
                        contentTo: { connect: { id: contentToId } },
                        user: { connect: { id: userId } },
                    },
                    update: {
                        deletedAt: null,
                    }
                });
            })
            const createdTranslations = await Promise.all(upsertOperations);

            return createdTranslations.map(translation => translation.id);
        } catch (error) {
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
            console.log('error', error);
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
            throw new Error('Error updating Content');
        }

    }

    public static async delete(pairsToRemove: (number | string)[][], userId: string): Promise<void> {
        try {
            const ids = pairsToRemove.map(pair => String(pair[0]));

            await this.translationRepo.updateMany({
                where: { id: { in: ids } },
                data: {
                    deletedAt: new Date()
                }

            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundError('Content not found');
            }
            throw new Error('Error deleting Content');
        }

    }
}