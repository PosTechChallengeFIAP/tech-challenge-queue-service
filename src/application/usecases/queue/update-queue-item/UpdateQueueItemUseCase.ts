import { inject, injectable } from "tsyringe";
import { TUpdateQueueItemUseCaseInput, TUpdateQueueItemUseCaseOutput } from "./TUpdateQueueItemUseCase";
import { IUpdateQueueItemUseCase } from "./IUpdateQueueItemUseCase";
import { IQueueItemRepository } from "@domain/repositories/IQueueItemRepository";
import { QueueItem } from "@domain/models/queue-item";
import { EQueueItemStatus } from "@domain/models/EQueueItemStatus";
import { ESQSMessageType, SQSHandler } from "@infra/aws/sqs/sendMessage";

@injectable()
export class UpdateQueueItemUseCase implements IUpdateQueueItemUseCase {
    constructor(
        @inject("QueueItemRepository")
        private readonly queueItemRepository: IQueueItemRepository,
    ) {}

    async execute(input: TUpdateQueueItemUseCaseInput): Promise<TUpdateQueueItemUseCaseOutput> {
        const { id, status } = input;
        const queueItemFound = await this.queueItemRepository.findById(id);

        if (!queueItemFound) {
            throw new Error("Queue item not found");
        }

        const queueItem = new QueueItem(
            queueItemFound.id,
            queueItemFound.title,
            queueItemFound.status,
            queueItemFound.pdvId,
            queueItemFound.orderId,
            queueItemFound.products,
            queueItemFound.createdAt,
            queueItemFound.updatedAt,
        );
        queueItem.setStatus(status);

        const updatedQueueItem = await this.queueItemRepository.update(id, queueItem);

        if (status === EQueueItemStatus.DONE) {
            SQSHandler.sendMessage({
                data: {
                    orderId: updatedQueueItem.orderId,
                    status: 'DONE'
                },
                type: ESQSMessageType.UPDATE_ORDER
            })
        }

        return updatedQueueItem;
    }
}