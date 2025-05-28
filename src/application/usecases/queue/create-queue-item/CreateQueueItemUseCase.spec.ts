import { CreateQueueItemUseCase } from "./CreateQueueItemUseCase";
import { IQueueItemRepository } from "@domain/repositories/IQueueItemRepository";
import { EQueueItemStatus } from "@domain/models/EQueueItemStatus";
import { SQSHandler, ESQSMessageType } from "@infra/aws/sqs/sendMessage";

jest.mock("@infra/aws/sqs/sendMessage", () => ({
  SQSHandler: {
    sendMessage: jest.fn()
  },
  ESQSMessageType: {
    UPDATE_ORDER: "UPDATE_ORDER"
  }
}));

describe('CreateQueueItemUseCase', () => {
  let useCase: CreateQueueItemUseCase;
  let queueItemRepository: jest.Mocked<IQueueItemRepository>;

  const mockInput = {
    title: 'Pedido #123',
    pdvId: 'pdv-1',
    orderId: 'order-1',
    products: [{ id: 'prod-1', quantity: 2 }]
  } as any;

  const mockQueueItem = {
    id: 'queue-1',
    ...mockInput,
    status: EQueueItemStatus.RECEIVED
  };

  beforeEach(() => {
    queueItemRepository = {
      create: jest.fn().mockResolvedValue(mockQueueItem)
    } as any;

    useCase = new CreateQueueItemUseCase(queueItemRepository);
  });

  it('when executed with valid input should create a queue item with RECEIVED status', async () => {
    const result = await useCase.execute(mockInput);

    expect(queueItemRepository.create).toHaveBeenCalledWith({
      ...mockInput,
      status: EQueueItemStatus.RECEIVED
    });
    expect(result).toEqual(mockQueueItem);
  });

  it('when executed with valid input should send message to SQS with orderId and QUEUED status', async () => {
    await useCase.execute(mockInput);

    expect(SQSHandler.sendMessage).toHaveBeenCalledWith({
      data: {
        orderId: mockInput.orderId,
        status: 'QUEUED'
      },
      type: ESQSMessageType.UPDATE_ORDER
    });
  });
});
