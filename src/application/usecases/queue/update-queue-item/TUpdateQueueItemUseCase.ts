import { IQueueItem } from "@application/DTOs/IQueueItem"
import { EQueueItemStatus } from "@domain/models/EQueueItemStatus"

export type TUpdateQueueItemUseCaseInput = {
    id: string
    status: EQueueItemStatus
}

export type TUpdateQueueItemUseCaseOutput = IQueueItem