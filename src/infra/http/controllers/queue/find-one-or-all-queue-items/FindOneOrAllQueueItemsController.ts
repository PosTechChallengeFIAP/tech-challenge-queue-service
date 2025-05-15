import { IFindOneOrAllQueueItemsUseCase } from "@application/usecases/queue/find-one-or-all-queue-items/IFindOneOrAllQueueItemsUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindOneOrAllQueueItemsController implements IController {
    constructor(
        @inject("FindOneOrAllQueueItemsUseCase")
        private readonly findOneOrAllQueueItemsUseCase: IFindOneOrAllQueueItemsUseCase,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { id, pdvId, orderId, status } = httpRequest.query;
        
        const queueItems = await this.findOneOrAllQueueItemsUseCase.execute({
            id: id ? String(id) : undefined,
            pdvId: pdvId ? String(pdvId) : undefined,
            orderId: orderId ? String(orderId) : undefined,
            status: status ? String(status) : undefined,
        });

        return HttpResponseHandler.ok(queueItems)
    }
}