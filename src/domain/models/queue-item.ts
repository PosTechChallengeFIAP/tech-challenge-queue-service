import { IQueueItem } from "@application/DTOs/IQueueItem";
import { EQueueItemStatus } from "./EQueueItemStatus";
import { IQueueProduct } from "@application/DTOs/IQueueProduct";

export class QueueItem implements IQueueItem {
    id: string;
    title: string;
    status: EQueueItemStatus;
    products: IQueueProduct[];
    orderId: string;
    pdvId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        title: string,
        status: EQueueItemStatus,
        pdvId: string,
        orderId: string,
        products: IQueueProduct[],
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.pdvId = pdvId;
        this.orderId = orderId;
        this.products = products;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    setStatus(status: EQueueItemStatus): void {
        const availableStatusChenges: { [K in EQueueItemStatus]: EQueueItemStatus[] } = {
            [EQueueItemStatus.RECEIVED]: [EQueueItemStatus.PREPARING],
            [EQueueItemStatus.PREPARING]: [EQueueItemStatus.DONE],
            [EQueueItemStatus.DONE]: [EQueueItemStatus.FINISHED],
            [EQueueItemStatus.FINISHED]: [],
        }

        if (availableStatusChenges[this.status].includes(status)) {
            this.status = status;
        } else {
            throw new Error(`Invalid status change from ${this.status} to ${status}`);
        }
    }
}