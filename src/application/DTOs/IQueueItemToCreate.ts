import { EQueueItemStatus } from "@domain/models/EQueueItemStatus"
import { IQueueProduct } from "./IQueueProduct"

export interface IQueueItemToCreate {
    title: string
    status: EQueueItemStatus
    pdvId: string
    orderId: string
    products: IQueueProduct[]
}