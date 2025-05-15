import { IUseCase } from "@application/usecases/IUseCase";
import { TCreateQueueItemUseCaseInput, TCreateQueueItemUseCaseOutput } from "./TCreateQueueItemUseCase";

export interface ICreateQueueItemUseCase extends IUseCase<TCreateQueueItemUseCaseInput, TCreateQueueItemUseCaseOutput> {}