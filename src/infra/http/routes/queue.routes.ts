import { Router } from "express"
import { IController } from "../protocols/controller"
import { container } from "tsyringe"
import { RouterAdapter } from "../adapters/RouterAdapter"

const createQueueItemController: IController = container.resolve('CreateQueueItemController') 

export default (route: Router): void => {
    route.post('/queue-item', RouterAdapter.adapt(createQueueItemController))
}