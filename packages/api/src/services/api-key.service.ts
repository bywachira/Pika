import { PrismaClient } from '@prisma/client'
import uuidAPIKey from 'uuid-apikey';

const prisma = new PrismaClient();

export default class APIKeyService {
    constructor() { }

    public async generateAPIKey(accountId: string) {
        try {
            const existingKey = await prisma.credentials.findFirst({
                where: {
                    acc_id: accountId
                }
            })

            if (existingKey) {
                await prisma.credentials.delete({
                    where: {
                        id: existingKey.id
                    }
                })

                const newCreds = uuidAPIKey.create();

                const newKey = await prisma.credentials.create({
                    data: {
                        acc_id: accountId,
                        api_key: newCreds.apiKey,
                        api_uuid: newCreds.uuid
                    }
                })

                return newKey.api_key;
            }
            else {
                const newCreds = uuidAPIKey.create();

                const newKey = await prisma.credentials.create({
                    data: {
                        acc_id: accountId,
                        api_key: newCreds.apiKey,
                        api_uuid: newCreds.uuid
                    }
                })

                return newKey.api_key;
            }
        } catch (error: any) {
            throw new Error("Problem while generating api key");
        }
    }

    public async verifyAPIKey(apiKey: string) {
        try {
            if (!uuidAPIKey.isAPIKey(apiKey)) throw new Error("Invalid api key");

            const pUuid = uuidAPIKey.toUUID(apiKey);

            const creds = await prisma.credentials.findFirst({
                where: {
                    api_uuid: pUuid
                }
            })

            if (creds) {
                return {
                    acc_id: creds.acc_id
                }
            } else {
                throw new Error("Invalid api key")
            }
        } catch (error: any) {
            throw new Error("Invalid api key")
        }
    }
}