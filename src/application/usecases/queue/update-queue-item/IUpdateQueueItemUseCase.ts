import { IUseCase } from "@application/usecases/IUseCase";
import { TUpdateQueueItemUseCaseInput, TUpdateQueueItemUseCaseOutput } from "./TUpdateQueueItemUseCase";

export interface IUpdateQueueItemUseCase extends IUseCase<TUpdateQueueItemUseCaseInput, TUpdateQueueItemUseCaseOutput> {}