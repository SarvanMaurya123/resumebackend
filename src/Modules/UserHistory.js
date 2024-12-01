import mongoose from 'mongoose';
import { Schema } from "mongoose"
const userHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    details: {
        type: Schema.Types.Mixed,
        required: true
    }
});

const UserHistory = mongoose.model('UserHistory', userHistorySchema);

export default UserHistory;
