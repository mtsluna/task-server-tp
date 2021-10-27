import { Schema } from "mongoose";

export const UserSchema = new Schema({
    username: { type: String, index: true },
    password: { type: String },
    name: { type: String },
    surname: { type: String },
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, index: true },
    updated_at: { type: Date }
}, {
    versionKey: false
})
