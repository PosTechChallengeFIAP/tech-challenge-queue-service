import { inject, injectable } from "tsyringe";
import { ICreateQueueItemUseCase } from "./ICreateQueueItemUseCase";
import { IQueueItemRepository } from "@domain/repositories/IQueueItemRepository";
import { TCreateQueueItemUseCaseInput, TCreateQueueItemUseCaseOutput } from "./TCreateQueueItemUseCase";
import { IQueueItemToCreate } from "@application/DTOs/IQueueItemToCreate";
import { EQueueItemStatus } from "@domain/models/EQueueItemStatus";
import { ESQSMessageType, SQSHandler } from "@infra/aws/sqs/sendMessage";

@injectable()
export class CreateQueueItemUseCase implements ICreateQueueItemUseCase {
    constructor(
        @inject("QueueItemRepository")
        private readonly queueItemRepository: IQueueItemRepository,
    ) {}

    async execute(input: TCreateQueueItemUseCaseInput): Promise<TCreateQueueItemUseCaseOutput> {
        const {
            title,
            pdvId,
            orderId,
            products,
        } = input;

        const queueItemToCreate: IQueueItemToCreate = {
            title,
            pdvId,
            orderId,
            products,
            status: EQueueItemStatus.RECEIVED,
        };

        const queueItem = await this.queueItemRepository.create(queueItemToCreate);

        SQSHandler.sendMessage({
            data: {
                orderId,
                status: 'QUEUED'
            },
            type: ESQSMessageType.UPDATE_ORDER
        })
        return queueItem;
    }
}