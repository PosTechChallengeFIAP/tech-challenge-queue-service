import { IQueueItemRepository } from "@domain/repositories/IQueueItemRepository";
import { inject, injectable } from "tsyringe";
import { IFindOneOrAllQueueItemsUseCase } from "./IFindOneOrAllQueueItemsUseCase";
import { IQueueItem } from "@application/DTOs/IQueueItem";
import { TFindOneOrAllQueueItemsUseCaseInput, TFindOneOrAllQueueItemsUseCaseOutput } from "./TFindOneOrAllQueueItemsUseCase";

@injectable()
export class FindOneOrAllQueueItemsUseCase implements IFindOneOrAllQueueItemsUseCase {
    constructor(
        @inject("QueueItemRepository")
        private readonly queueItemRepository: IQueueItemRepository,
    ) {}

    async execute(input: TFindOneOrAllQueueItemsUseCaseInput): Promise<TFindOneOrAllQueueItemsUseCaseOutput> {
        const {
            id,
            pdvId,
            orderId,
            status,
        } = input;

        if (id) {
            return await this.queueItemRepository.findById(id);
        }

        if (pdvId && status) {
            return await this.queueItemRepository.findByPdvIdAndStatus(pdvId, status);
        }

        if (pdvId) {
            return await this.queueItemRepository.findByPdvId(pdvId);
        }

        if (orderId) {
            return await this.queueItemRepository.findByOrderId(orderId);
        }

        if (status) {
            return await this.queueItemRepository.findByStatus(status);
        }

        return await this.queueItemRepository.findAll();
    }
}