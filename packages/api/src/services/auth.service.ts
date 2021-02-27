import Account from "../models/account";

export default class AuthService {
    constructor() { }

    public async authentication(payload: {
        uid: string;
        name: string;
        email: string;
        token: string;
        avatar: string;
    }) {
        const account = await Account.findOne({ uid: payload.uid, email: payload.email })

        if (!account) {
            const newAccount = Account.build({
                uid: payload.uid,
                name: payload.name,
                email: payload.email,
                email_verified: true,
                avatar: payload.avatar
            })

            await newAccount.save();

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
        const account = await Account.findOne({
            email,
            uid
        })

        return account
    }
}