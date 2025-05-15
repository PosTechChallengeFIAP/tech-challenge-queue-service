import { IQueueItem } from "@application/DTOs/IQueueItem";
import { Schema, model } from "mongoose";

const QueueItemSchema = new Schema<IQueueItem>({
    status: {
        type: String,
        enum: ["RECEIVED", "PREPARING", "DONE", "FINISHED"],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    pdvId: {
        type: String,
        required: true,
    },
    products: [
        {
            type: {
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            }
        },
    ]
},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        }
    },
    toObject: {
        virtuals: true,
        transform: (_, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        }
    }
});

export const QueueItemModel = model<IQueueItem>('Queue', QueueItemSchema);
