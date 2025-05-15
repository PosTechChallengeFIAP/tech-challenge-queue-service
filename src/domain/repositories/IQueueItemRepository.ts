import { IQueueItem } from "@application/DTOs/IQueueItem"
import { IQueueItemToCreate } from "@application/DTOs/IQueueItemToCreate"

export interface IQueueItemRepository {
    findAll(): Promise<IQueueItem[]>
    findById(id: string): Promise<IQueueItem>
    findByStatus(status: string): Promise<IQueueItem[]>
    findByPdvId(pdvId: string): Promise<IQueueItem[]>
    findByOrderId(orderId: string): Promise<IQueueItem[]>
    findByPdvIdAndStatus(pdvId: string, status: string): Promise<IQueueItem[]>
    create(data: IQueueItemToCreate): Promise<IQueueItem>
    update(id: string, data: IQueueItem): Promise<IQueueItem>
}