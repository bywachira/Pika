import { PrismaClient } from '@prisma/client';
import uuidAPIKey from 'uuid-apikey';
import SpacesService from './spaces.service';

const prisma = new PrismaClient();

export default class ImageServices extends SpacesService {
    imagePayload?: any;
    accountId: string;

    constructor(accountId: string, imagePayload: any) {
        super();
        this.accountId = accountId;
        this.imagePayload = imagePayload;
    };

    public async saveImage() {
        try {
            const imageSize: any = await this.sizeOf(this.imagePayload.Key, this.imagePayload.Bucket);

            const image = await prisma.images.create({
                data: {
                    acc_id: this.accountId,
                    image: this.imagePayload.Location,
                    size: imageSize,
                    type: this.imagePayload.Location.split('.')[1],
                    etag: this.imagePayload.ETag,
                    key: this.imagePayload.Key,
                    bucket: this.imagePayload.Bucket,
                }
            })

            return {
                url: image.image,
                size: image.size,
            }
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    public async getImages(acc_id: string, limit: number, cursor?: string, jump?: number) {
        try {
            const pagination_condition: any = cursor ? {
                skip: jump,
                cursor: {
                    id: cursor,
                },
                take: limit,
            } : {
                take: limit,
            };

            const images = await prisma.images.findMany({
                where: {
                    acc_id,
                },
                orderBy: {
                    id: 'asc'
                },
                ...pagination_condition,
                include: {
                    account: false,
                }
            });

            return images;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    public async getImage(acc_id: string, image_id: string) {
        try {
            const image = await prisma.images.findFirst({
                where: {
                    AND: [
                        {
                            acc_id
                        },
                        {
                            id: image_id
                        }
                    ]
                }
            })

            if (!image?.id) throw new Error("Image not found");

            return image;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    public async deleteImage(acc_id: string, image_id: string) {
        try {
            const image = await prisma.images.findFirst({
                where: {
                    AND: [
                        {
                            acc_id
                        },
                        {
                            id: image_id
                        }
                    ]
                }
            })

            if (!image?.id) throw new Error("Image not found");

            await prisma.images.delete({
                where: {
                    id: image_id
                }
            })

            await this.deleteImage(image.key, image.bucket);

            return image;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    }
}