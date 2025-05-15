import { IQueueItem } from "@application/DTOs/IQueueItem"

export type TFindOneOrAllQueueItemsUseCaseInput = {
    id?: string
    pdvId?: string
    orderId?: string
    status?: string
}

export type TFindOneOrAllQueueItemsUseCaseOutput = IQueueItem | IQueueItem[] | null