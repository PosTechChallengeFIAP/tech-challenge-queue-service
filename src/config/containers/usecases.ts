import { CreateQueueItemUseCase } from "@application/usecases/queue/create-queue-item/CreateQueueItemUseCase";
import { ICreateQueueItemUseCase } from "@application/usecases/queue/create-queue-item/ICreateQueueItemUseCase";
import { container } from "tsyringe";

container.registerSingleton<ICreateQueueItemUseCase>('CreateQueueItemUseCase', CreateQueueItemUseCase);