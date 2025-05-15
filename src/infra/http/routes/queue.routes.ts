import { Router } from "express"
import { IController } from "../protocols/controller"
import { container } from "tsyringe"
import { RouterAdapter } from "../adapters/RouterAdapter"

const findOneOrAllQueueItemsController: IController = container.resolve('FindOneOrAllQueueItemsController');
const createQueueItemController: IController = container.resolve('CreateQueueItemController');
const updateQueueItemController: IController = container.resolve('UpdateQueueItemController');

export default (route: Router): void => {
    route.get('/queue-item', RouterAdapter.adapt(findOneOrAllQueueItemsController))
    route.post('/queue-item', RouterAdapter.adapt(createQueueItemController))
    route.put('/queue-item/:id', RouterAdapter.adapt(updateQueueItemController))
}