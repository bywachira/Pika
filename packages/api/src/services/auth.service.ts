import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export default class AuthService {
    constructor() { }

    public async authentication(payload: {
        uid: string;
        name: string;
        email: string;
        token: string;
        avatar: string;
    }) {
        const account = await prisma.account.findFirst({
            where: { uid: payload.uid, email: payload.email }
        })

        if (!account) {
            const newAccount = await prisma.account.create({
                data: {
                    uid: payload.uid,
                    name: payload.name,
                    email: payload.email,
                    email_verified: true,
                    avatar: payload.avatar
                }
            })

            return {
                account: newAccount,
                success: true
            }
        } else {
            return {
                account,
                success: true
            }
        }
    }

    public async getUserByUid(uid: string, email?: string) {
        const account = await prisma.account.findFirst({
            where: {
                email,
                uid
            },
            include: {
                account_plan: true
            }
        })

        return account
    }
}