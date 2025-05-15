import { EQueueItemStatus } from "@domain/models/EQueueItemStatus"
import { IQueueProduct } from "./IQueueProduct"

export interface IQueueItem {
    id: string
    title: string
    status: EQueueItemStatus
    pdvId: string
    orderId: string
    products: IQueueProduct[]
    createdAt: Date
    updatedAt: Date
}