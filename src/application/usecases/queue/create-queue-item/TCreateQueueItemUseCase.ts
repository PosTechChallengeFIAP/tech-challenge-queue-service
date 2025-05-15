import { IQueueItem } from "@application/DTOs/IQueueItem"
import { IQueueItemToCreate } from "@application/DTOs/IQueueItemToCreate"

export type TCreateQueueItemUseCaseInput = Omit<IQueueItemToCreate, 'status'>

export type TCreateQueueItemUseCaseOutput = IQueueItem