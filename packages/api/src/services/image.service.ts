import { PrismaClient } from '@prisma/client';
import uuidAPIKey from 'uuid-apikey';
import SpacesService from './spaces.service';

const prisma = new PrismaClient();

export default class ImageServices extends SpacesService {
    imagePayload?: any;
    accountId: string;
    imageType: string;

    constructor(accountId: string, imagePayload: any, imageType: string) {
        super();
        this.accountId = accountId;
        this.imagePayload = imagePayload;
        this.imageType = imageType;
    };

    public async saveImage() {
        try {
            const imageSize: any = await this.sizeOf(this.imagePayload.Key, this.imagePayload.Bucket);

            const image = await prisma.images.create({
                data: {
                    acc_id: this.accountId,
                    image: this.imagePayload.Location,
                    size: imageSize,
                    type: this.imageType,
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

    public async getImages(acc_id: string, limit: number, cursor?: string, jump?: string) {
        try {
            const pagination_condition: any = cursor ? {
                // @ts-ignore
                skip: parseInt(jump, 10),
                cursor: {
                    id: cursor,
                },
                // @ts-ignore
                take: parseInt(limit, 10),
            } : {
                // @ts-ignore
                take: parseInt(limit, 10),
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

            const lastImageInResults = images[images.length - 1];

            const newCursor = lastImageInResults?.id;

            return {
                images,
                cursor: newCursor,
            };
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