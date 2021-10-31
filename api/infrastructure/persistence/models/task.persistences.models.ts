import { Schema } from "mongoose";

export const TaskSchema = new Schema({
    title: { type: String, index: true },
    due_date: { type: Date, index: true },
    creation_date: { type: Date, default: Date.now },
    numeric_reference: Number,
    observation: String,
    calendar_event: Boolean,
    event_id: String,
    type: String,
    user_id: { type: String, index: true },
    deleted_at: { type: Date, index: true },
    updated_at: { type: Date, index: true }
}, {
    versionKey: false
})
