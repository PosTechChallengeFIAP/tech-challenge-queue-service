import { IQueueItem } from "@application/DTOs/IQueueItem";
import { IQueueItemToCreate } from "@application/DTOs/IQueueItemToCreate";
import { IQueueItemRepository } from "@domain/repositories/IQueueItemRepository";
import { Model } from "mongoose";
import { injectable } from "tsyringe";
import { QueueItemModel } from "../schemas/queue-item.schema";

@injectable()
export class QueueItemSchemaRepository implements IQueueItemRepository {
    private queueItemModel: Model<IQueueItem>;

    constructor() {
        this.queueItemModel = QueueItemModel;
    }

    async create(data: IQueueItemToCreate): Promise<IQueueItem> {
        const queueItem = new this.queueItemModel(data);
        await queueItem.save();
        return queueItem.toObject();
    }

    async findAll(): Promise<IQueueItem[]> {
        return await this.queueItemModel.find().exec();
    }

    async findById(id: string): Promise<IQueueItem> {
        return await this.queueItemModel.findById(id).exec();
    }

    async findByStatus(status: string): Promise<IQueueItem[]> {
        return await this.queueItemModel.find({ status }).exec();
    }

    async findByPdvId(pdvId: string): Promise<IQueueItem[]> {
        return await this.queueItemModel.find({ pdvId }).exec();
    }

    async findByOrderId(orderId: string): Promise<IQueueItem[]> {
        return await this.queueItemModel.find({ orderId }).exec();
    }

    async findByPdvIdAndStatus(pdvId: string, status: string): Promise<IQueueItem[]> {
        return await this.queueItemModel.find({ pdvId, status }).exec();
    }

    async update(id: string, data: IQueueItem): Promise<IQueueItem> {
        return await this.queueItemModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
}