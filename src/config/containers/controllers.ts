import { CreateQueueItemController } from "@infra/http/controllers/queue/create-queue-item/CreateQueueItemController";
import { IController } from "@infra/http/protocols/controller";
import { container } from "tsyringe";

container.registerSingleton<IController>('CreateQueueItemController', CreateQueueItemController);