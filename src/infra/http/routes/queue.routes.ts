import { Router } from "express"
import { IController } from "../protocols/controller"
import { container } from "tsyringe"
import { RouterAdapter } from "../adapters/RouterAdapter"

const findOneOrAllQueueItemsController: IController = container.resolve('FindOneOrAllQueueItemsController') 
const createQueueItemController: IController = container.resolve('CreateQueueItemController') 

export default (route: Router): void => {
    route.get('/queue-item', RouterAdapter.adapt(findOneOrAllQueueItemsController))
    route.post('/queue-item', RouterAdapter.adapt(createQueueItemController))
}