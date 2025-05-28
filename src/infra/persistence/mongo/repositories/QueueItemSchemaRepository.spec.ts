import { QueueItemSchemaRepository } from "./QueueItemSchemaRepository";
import { QueueItemModel } from "../schemas/queue-item.schema";

jest.mock("../schemas/queue-item.schema", () => ({
  QueueItemModel: {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("QueueItemSchemaRepository", () => {
  let repository: QueueItemSchemaRepository;

  beforeEach(() => {
    repository = new QueueItemSchemaRepository();
    jest.clearAllMocks();
  });

  it("when create is called should create and return the item", async () => {
    const saveMock = jest.fn().mockResolvedValue(undefined);
    const toObjectMock = jest.fn().mockReturnValue({ id: "mocked" });

    const modelConstructor = jest.fn().mockImplementation(() => ({
      save: saveMock,
      toObject: toObjectMock,
    }));

    repository["queueItemModel"] = modelConstructor as any;

    const inputData = {
      title: "Item",
      status: "RECEIVED",
      pdvId: "PDV1",
      orderId: "ORDER1",
      products: [] as any,
    }as any;

    const result = await repository.create(inputData);

    expect(modelConstructor).toHaveBeenCalledWith(inputData);
    expect(saveMock).toHaveBeenCalled();
    expect(toObjectMock).toHaveBeenCalled();
    expect(result).toEqual({ id: "mocked" });
  });

  it("when findAll is called should return all items", async () => {
    const execMock = jest.fn().mockResolvedValue([{ id: "1" }]);
    (QueueItemModel.find as jest.Mock).mockReturnValue({ exec: execMock });

    const result = await repository.findAll();

    expect(QueueItemModel.find).toHaveBeenCalled();
    expect(execMock).toHaveBeenCalled();
    expect(result).toEqual([{ id: "1" }]);
  });

  it("when findById is called should return one item", async () => {
    const execMock = jest.fn().mockResolvedValue({ id: "123" });
    (QueueItemModel.findById as jest.Mock).mockReturnValue({ exec: execMock });

    const result = await repository.findById("123");

    expect(QueueItemModel.findById).toHaveBeenCalledWith("123");
    expect(execMock).toHaveBeenCalled();
    expect(result).toEqual({ id: "123" });
  });

  it("when findByStatus is called should filter by status", async () => {
    const execMock = jest.fn().mockResolvedValue([{ id: "1", status: "RECEIVED" }]);
    (QueueItemModel.find as jest.Mock).mockReturnValue({ exec: execMock });

    const result = await repository.findByStatus("RECEIVED");

    expect(QueueItemModel.find).toHaveBeenCalledWith({ status: "RECEIVED" });
    expect(execMock).toHaveBeenCalled();
    expect(result).toEqual([{ id: "1", status: "RECEIVED" }]);
  });

  it("when findByPdvId is called should filter by pdvId", async () => {
    const execMock = jest.fn().mockResolvedValue([{ id: "1", pdvId: "PDV1" }]);
    (QueueItemModel.find as jest.Mock).mockReturnValue({ exec: execMock });

    const result = await repository.findByPdvId("PDV1");

    expect(QueueItemModel.find).toHaveBeenCalledWith({ pdvId: "PDV1" });
    expect(execMock).toHaveBeenCalled();
    expect(result).toEqual([{ id: "1", pdvId: "PDV1" }]);
  });

  it("when findByOrderId is called should filter by orderId", async () => {
    const execMock = jest.fn().mockResolvedValue([{ id: "1", orderId: "ORDER1" }]);
    (QueueItemModel.find as jest.Mock).mockReturnValue({ exec: execMock });

    const result = await repository.findByOrderId("ORDER1");

    expect(QueueItemModel.find).toHaveBeenCalledWith({ orderId: "ORDER1" });
    expect(execMock).toHaveBeenCalled();
    expect(result).toEqual([{ id: "1", orderId: "ORDER1" }]);
  });

  it("when findByPdvIdAndStatus is called should filter by pdvId and status", async () => {
    const execMock = jest.fn().mockResolvedValue([{ id: "1", pdvId: "PDV1", status: "RECEIVED" }]);
    (QueueItemModel.find as jest.Mock).mockReturnValue({ exec: execMock });

    const result = await repository.findByPdvIdAndStatus("PDV1", "RECEIVED");

    expect(QueueItemModel.find).toHaveBeenCalledWith({ pdvId: "PDV1", status: "RECEIVED" });
    expect(execMock).toHaveBeenCalled();
    expect(result).toEqual([{ id: "1", pdvId: "PDV1", status: "RECEIVED" }]);
  });

  it("when update is called should update and return the item", async () => {
    const execMock = jest.fn().mockResolvedValue({ id: "1", status: "DONE" });
    (QueueItemModel.findByIdAndUpdate as jest.Mock).mockReturnValue({ exec: execMock });

    const result = await repository.update("1", { id: "1", status: "DONE" } as any);

    expect(QueueItemModel.findByIdAndUpdate).toHaveBeenCalledWith("1", { id: "1", status: "DONE" }, { new: true });
    expect(execMock).toHaveBeenCalled();
    expect(result).toEqual({ id: "1", status: "DONE" });
  });
});
