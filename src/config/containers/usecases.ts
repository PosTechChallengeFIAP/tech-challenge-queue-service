import { CreateQueueItemUseCase } from "@application/usecases/queue/create-queue-item/CreateQueueItemUseCase";
import { ICreateQueueItemUseCase } from "@application/usecases/queue/create-queue-item/ICreateQueueItemUseCase";
import { FindOneOrAllQueueItemsUseCase } from "@application/usecases/queue/find-one-or-all-queue-items/FindOneOrAllQueueItemsUseCase";
import { IFindOneOrAllQueueItemsUseCase } from "@application/usecases/queue/find-one-or-all-queue-items/IFindOneOrAllQueueItemsUseCase";
import { IUpdateQueueItemUseCase } from "@application/usecases/queue/update-queue-item/IUpdateQueueItemUseCase";
import { UpdateQueueItemUseCase } from "@application/usecases/queue/update-queue-item/UpdateQueueItemUseCase";
import { container } from "tsyringe";

container.registerSingleton<ICreateQueueItemUseCase>('CreateQueueItemUseCase', CreateQueueItemUseCase);
container.registerSingleton<IFindOneOrAllQueueItemsUseCase>('FindOneOrAllQueueItemsUseCase', FindOneOrAllQueueItemsUseCase);
container.registerSingleton<IUpdateQueueItemUseCase>('UpdateQueueItemUseCase', UpdateQueueItemUseCase);