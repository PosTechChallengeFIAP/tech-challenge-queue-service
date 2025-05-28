import { UpdateQueueItemUseCase } from "./UpdateQueueItemUseCase";
import { IQueueItemRepository } from "@domain/repositories/IQueueItemRepository";
import { EQueueItemStatus } from "@domain/models/EQueueItemStatus";
import { QueueItem } from "@domain/models/queue-item";
import { SQSHandler, ESQSMessageType } from "@infra/aws/sqs/sendMessage";

jest.mock("@infra/aws/sqs/sendMessage", () => ({
  SQSHandler: {
    sendMessage: jest.fn()
  },
  ESQSMessageType: {
    UPDATE_ORDER: "UPDATE_ORDER"
  }
}));

describe("UpdateQueueItemUseCase", () => {
  let useCase: UpdateQueueItemUseCase;
  let queueItemRepository: jest.Mocked<IQueueItemRepository>;

  const existingQueueItem = {
    id: "item-1",
    title: "Pedido #1",
    status: EQueueItemStatus.RECEIVED,
    pdvId: "pdv-1",
    orderId: "order-1",
    products: [{ id: "prod-1", quantity: 1 }],
    createdAt: new Date(),
    updatedAt: new Date()
  } as any;

  const updatedQueueItem = new QueueItem(
    existingQueueItem.id,
    existingQueueItem.title,
    EQueueItemStatus.PREPARING,
    existingQueueItem.pdvId,
    existingQueueItem.orderId,
    existingQueueItem.products,
    existingQueueItem.createdAt,
    existingQueueItem.updatedAt
  );

  beforeEach(() => {
    queueItemRepository = {
      findById: jest.fn().mockResolvedValue(existingQueueItem),
      update: jest.fn().mockResolvedValue(updatedQueueItem)
    } as any;

    useCase = new UpdateQueueItemUseCase(queueItemRepository);
    jest.clearAllMocks();
  });

  it("when item exists should update status and return updated queue item", async () => {
    const result = await useCase.execute({
      id: existingQueueItem.id,
      status: EQueueItemStatus.PREPARING
    });

    expect(queueItemRepository.findById).toHaveBeenCalledWith(existingQueueItem.id);
    expect(queueItemRepository.update).toHaveBeenCalledWith(existingQueueItem.id, expect.any(QueueItem));
    expect(result).toEqual(updatedQueueItem);
  });

  it("when item does not exist should throw an error", async () => {
    queueItemRepository.findById.mockResolvedValueOnce(null);

    await expect(
      useCase.execute({ id: "non-existent", status: EQueueItemStatus.DONE })
    ).rejects.toThrow("Queue item not found");
  });

  it("when updated status is DONE should send SQS message with DONE status", async () => {
    const doneQueueItem = new QueueItem(
      existingQueueItem.id,
      existingQueueItem.title,
      EQueueItemStatus.PREPARING,
      existingQueueItem.pdvId,
      existingQueueItem.orderId,
      existingQueueItem.products,
      existingQueueItem.createdAt,
      existingQueueItem.updatedAt
    );

    queueItemRepository.findById.mockResolvedValueOnce(doneQueueItem);
    queueItemRepository.update.mockResolvedValueOnce(doneQueueItem);

    await useCase.execute({ id: existingQueueItem.id, status: EQueueItemStatus.DONE });

    expect(SQSHandler.sendMessage).toHaveBeenCalledWith({
      data: {
        orderId: existingQueueItem.orderId,
        status: "DONE"
      },
      type: ESQSMessageType.UPDATE_ORDER
    });
  });

  it("when updated status is not DONE should not send any SQS message", async () => {
    await useCase.execute({ id: existingQueueItem.id, status: EQueueItemStatus.PREPARING });

    expect(SQSHandler.sendMessage).not.toHaveBeenCalled();
  });
});
