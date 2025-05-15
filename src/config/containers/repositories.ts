import { IQueueItemRepository } from "@domain/repositories/IQueueItemRepository";
import { QueueItemSchemaRepository } from "@infra/persistence/mongo/repositories/QueueItemSchemaRepository";
import { container } from "tsyringe";

container.registerSingleton<IQueueItemRepository>("QueueItemRepository", QueueItemSchemaRepository);