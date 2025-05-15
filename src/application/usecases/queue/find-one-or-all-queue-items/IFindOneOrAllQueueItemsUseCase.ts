import { IUseCase } from "@application/usecases/IUseCase";
import { TFindOneOrAllQueueItemsUseCaseInput, TFindOneOrAllQueueItemsUseCaseOutput } from "./TFindOneOrAllQueueItemsUseCase";

export interface IFindOneOrAllQueueItemsUseCase extends IUseCase<TFindOneOrAllQueueItemsUseCaseInput, TFindOneOrAllQueueItemsUseCaseOutput> {}