import { ICreateQueueItemUseCase } from "@application/usecases/queue/create-queue-item/ICreateQueueItemUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateQueueItemController implements IController {
    constructor(
        @inject("CreateQueueItemUseCase")
        private readonly createQueueItemUseCase: ICreateQueueItemUseCase,
    ) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { title, pdvId, orderId, products } = request.body;

        const queueItem = await this.createQueueItemUseCase.execute({
            title,
            pdvId,
            orderId,
            products,
        });

        return HttpResponseHandler.created(queueItem)
    }
}