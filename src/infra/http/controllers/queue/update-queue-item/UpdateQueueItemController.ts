import { IUpdateQueueItemUseCase } from "@application/usecases/queue/update-queue-item/IUpdateQueueItemUseCase";
import { IController } from "@infra/http/protocols/controller";
import { HttpRequest, HttpResponse } from "@infra/http/protocols/http";
import { HttpResponseHandler } from "@infra/http/protocols/httpResponses";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateQueueItemController implements IController {
    constructor(
        @inject("UpdateQueueItemUseCase")
        private readonly updateQueueItemUseCase: IUpdateQueueItemUseCase,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { id } = httpRequest.params;
        const { status } = httpRequest.body;

        const updatedQueueItem = await this.updateQueueItemUseCase.execute({
            id: String(id),
            status,
        });

        return HttpResponseHandler.ok(updatedQueueItem);
    }
}