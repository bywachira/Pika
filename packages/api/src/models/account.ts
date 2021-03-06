import mongoose, { Schema } from "mongoose";

export enum PLAN_STATUS {
    ACTIVE = "active",
    TRIAL = "trial",
    EXPIRED = "expired",
    ARCHIVED = "archived",
    STASIS = "stasis"
}

export interface IAccount {
    uid: string;
    avatar: string;
    name: string;
    email: string;
    current_plan?: PLAN_STATUS;
    expires?: string;
    image_quota?: number;
    used_quota?: number;
    email_verified?: boolean;
}

export interface AccountDoc extends mongoose.Document, IAccount { }

export interface AccountModelInterface extends mongoose.Model<AccountDoc> {
    build(attr: IAccount): AccountDoc;
}

const accountSchema: any = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    current_plan: {
        type: String,
        default: "stasis"
    },
    expires: {
        type: String,
        required: false,
    },
    image_quota: {
        type: Number,
        default: 35
    },
    used_quota: {
        type: Number,
        default: 0
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    third_part_auth: {
        type: Array,
        default: []
    },
    avatar: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

accountSchema.statics.build = (attr: IAccount) => {
    return new Account(attr);
}

const Account = mongoose.model<AccountDoc, AccountModelInterface>("account", accountSchema);

export default Account;