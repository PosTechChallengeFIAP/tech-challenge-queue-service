import { QueueItem } from "./queue-item";
import { EQueueItemStatus } from "./EQueueItemStatus";

describe("QueueItem", () => {
  const baseParams = {
    id: "item-1",
    title: "Pedido #1",
    status: EQueueItemStatus.RECEIVED,
    pdvId: "pdv-1",
    orderId: "order-1",
    products: [{ id: "prod-1", quantity: 2 }] as any,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("when instantiated should set all properties correctly", () => {
    const item = new QueueItem(
      baseParams.id,
      baseParams.title,
      baseParams.status,
      baseParams.pdvId,
      baseParams.orderId,
      baseParams.products,
      baseParams.createdAt,
      baseParams.updatedAt
    );

    expect(item.id).toBe(baseParams.id);
    expect(item.title).toBe(baseParams.title);
    expect(item.status).toBe(baseParams.status);
    expect(item.pdvId).toBe(baseParams.pdvId);
    expect(item.orderId).toBe(baseParams.orderId);
    expect(item.products).toBe(baseParams.products);
    expect(item.createdAt).toBe(baseParams.createdAt);
    expect(item.updatedAt).toBe(baseParams.updatedAt);
  });

  it("when status is RECEIVED and setStatus is called with PREPARING should update status", () => {
    const item = new QueueItem(
      baseParams.id,
      baseParams.title,
      EQueueItemStatus.RECEIVED,
      baseParams.pdvId,
      baseParams.orderId,
      baseParams.products,
      baseParams.createdAt,
      baseParams.updatedAt
    );

    item.setStatus(EQueueItemStatus.PREPARING);
    expect(item.status).toBe(EQueueItemStatus.PREPARING);
  });

  it("when status is PREPARING and setStatus is called with DONE should update status", () => {
    const item = new QueueItem(
      baseParams.id,
      baseParams.title,
      EQueueItemStatus.PREPARING,
      baseParams.pdvId,
      baseParams.orderId,
      baseParams.products,
      baseParams.createdAt,
      baseParams.updatedAt
    );

    item.setStatus(EQueueItemStatus.DONE);
    expect(item.status).toBe(EQueueItemStatus.DONE);
  });

  it("when status is DONE and setStatus is called with FINISHED should update status", () => {
    const item = new QueueItem(
      baseParams.id,
      baseParams.title,
      EQueueItemStatus.DONE,
      baseParams.pdvId,
      baseParams.orderId,
      baseParams.products,
      baseParams.createdAt,
      baseParams.updatedAt
    );

    item.setStatus(EQueueItemStatus.FINISHED);
    expect(item.status).toBe(EQueueItemStatus.FINISHED);
  });

  it("when status change is invalid should throw an error", () => {
    const item = new QueueItem(
      baseParams.id,
      baseParams.title,
      EQueueItemStatus.RECEIVED,
      baseParams.pdvId,
      baseParams.orderId,
      baseParams.products,
      baseParams.createdAt,
      baseParams.updatedAt
    );

    expect(() => item.setStatus(EQueueItemStatus.DONE)).toThrowError(
      "Invalid status change from RECEIVED to DONE"
    );
  });
});
