import { FindOneOrAllQueueItemsUseCase } from "./FindOneOrAllQueueItemsUseCase";
import { IQueueItemRepository } from "@domain/repositories/IQueueItemRepository";
import { EQueueItemStatus } from "@domain/models/EQueueItemStatus";

describe("FindOneOrAllQueueItemsUseCase", () => {
  let useCase: FindOneOrAllQueueItemsUseCase;
  let queueItemRepository: jest.Mocked<IQueueItemRepository>;

  const mockResult = [{ id: "item-1" }];

  beforeEach(() => {
    queueItemRepository = {
      findById: jest.fn().mockResolvedValue(mockResult),
      findByPdvIdAndStatus: jest.fn().mockResolvedValue(mockResult),
      findByPdvId: jest.fn().mockResolvedValue(mockResult),
      findByOrderId: jest.fn().mockResolvedValue(mockResult),
      findByStatus: jest.fn().mockResolvedValue(mockResult),
      findAll: jest.fn().mockResolvedValue(mockResult),
    } as any;

    useCase = new FindOneOrAllQueueItemsUseCase(queueItemRepository);
  });

  it("when input has id should return item by id", async () => {
    const result = await useCase.execute({ id: "123" });
    expect(queueItemRepository.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockResult);
  });

  it("when input has pdvId and status should return items by pdvId and status", async () => {
    const result = await useCase.execute({
      pdvId: "pdv-1",
      status: EQueueItemStatus.RECEIVED,
    });
    expect(queueItemRepository.findByPdvIdAndStatus).toHaveBeenCalledWith(
      "pdv-1",
      EQueueItemStatus.RECEIVED
    );
    expect(result).toEqual(mockResult);
  });

  it("when input has only pdvId should return items by pdvId", async () => {
    const result = await useCase.execute({ pdvId: "pdv-1" });
    expect(queueItemRepository.findByPdvId).toHaveBeenCalledWith("pdv-1");
    expect(result).toEqual(mockResult);
  });

  it("when input has only orderId should return items by orderId", async () => {
    const result = await useCase.execute({ orderId: "order-1" });
    expect(queueItemRepository.findByOrderId).toHaveBeenCalledWith("order-1");
    expect(result).toEqual(mockResult);
  });

  it("when input has only status should return items by status", async () => {
    const result = await useCase.execute({ status: EQueueItemStatus.DONE });
    expect(queueItemRepository.findByStatus).toHaveBeenCalledWith(EQueueItemStatus.DONE);
    expect(result).toEqual(mockResult);
  });

  it("when input is empty should return all items", async () => {
    const result = await useCase.execute({});
    expect(queueItemRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockResult);
  });
});
