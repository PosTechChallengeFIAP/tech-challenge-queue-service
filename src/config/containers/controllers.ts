import { CreateQueueItemController } from "@infra/http/controllers/queue/create-queue-item/CreateQueueItemController";
import { FindOneOrAllQueueItemsController } from "@infra/http/controllers/queue/find-one-or-all-queue-items/FindOneOrAllQueueItemsController";
import { UpdateQueueItemController } from "@infra/http/controllers/queue/update-queue-item/UpdateQueueItemController";
import { IController } from "@infra/http/protocols/controller";
import { container } from "tsyringe";

container.registerSingleton<IController>('CreateQueueItemController', CreateQueueItemController);
container.registerSingleton<IController>('FindOneOrAllQueueItemsController', FindOneOrAllQueueItemsController);
container.registerSingleton<IController>('UpdateQueueItemController', UpdateQueueItemController);