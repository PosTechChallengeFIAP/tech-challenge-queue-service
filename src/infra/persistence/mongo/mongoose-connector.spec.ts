import mongoose from "mongoose";
import { mongoConfig } from "@config/variables/mongo";
import { Logger } from "@infra/utils/logger/Logger";
import { MongooseConnector } from "./mongoose-connector";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));
jest.mock("@infra/utils/logger/Logger", () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

describe("MongooseConnector", () => {
  let connector: MongooseConnector;

  beforeEach(() => {
    connector = MongooseConnector.getInstance() as MongooseConnector;
    jest.clearAllMocks();
  });

  it("when getInstance is called should return a singleton instance", () => {
    const instance1 = MongooseConnector.getInstance();
    const instance2 = MongooseConnector.getInstance();
    expect(instance1).toBe(instance2);
  });

  it("when connect is called and already connected should return true", async () => {
    (connector as any).isConnectedFlag = true;
    const result = await connector.connect();
    expect(result).toBe(true);
  });

  it("when connect is called and not connected should connect to mongoose and log success", async () => {
    const mockMongooseConnection = {
      connection: { readyState: 1 },
      disconnect: jest.fn(),
    };
    (mongoose.connect as jest.Mock).mockResolvedValue(mockMongooseConnection);

    (connector as any).isConnectedFlag = false;
    const result = await connector.connect();

    expect(mongoose.connect).toHaveBeenCalledWith(
      `mongodb+srv://${mongoConfig.user}:${mongoConfig.pass}@${mongoConfig.host}`,
      { dbName: mongoConfig.database }
    );
    expect(Logger.info).toHaveBeenCalledWith({ message: '✅ Connected to MongoDB with Mongoose' });
    expect(result).toBe(true);
  });

  it("when connect fails should catch and log error", async () => {
    const error = new Error("Connection failed");
    (mongoose.connect as jest.Mock).mockRejectedValue(error);

    (connector as any).isConnectedFlag = false;
    const result = await connector.connect();

    expect(Logger.error).toHaveBeenCalledWith({
      message: '❌ Mongoose connection error:',
      additionalInfo: error,
    });
    expect(result).toBe(false);
  });

  it("when isConnected is called should return true if connected and readyState is 1", () => {
    (connector as any).isConnectedFlag = true;
    (connector as any).mongooseConnection = {
      connection: { readyState: 1 }
    };
    expect(connector.isConnected()).toBe(true);
  });

  it("when isConnected is called should return false if not connected", () => {
    (connector as any).isConnectedFlag = false;
    expect(connector.isConnected()).toBe(false);
  });

  it("when disconnect is called and already disconnected should return true", async () => {
    (connector as any).isConnectedFlag = false;
    const result = await connector.disconnect();
    expect(result).toBe(true);
  });

  it("when disconnect is called and connected should disconnect and log", async () => {
    const disconnectMock = jest.fn().mockResolvedValue(true);
    (connector as any).isConnectedFlag = true;
    (connector as any).mongooseConnection = {
      disconnect: disconnectMock,
    };

    const result = await connector.disconnect();

    expect(disconnectMock).toHaveBeenCalled();
    expect(Logger.info).toHaveBeenCalledWith({ message: '🔌 Disconnected from MongoDB with Mongoose' });
    expect(result).toBe(true);
  });

  it("when disconnect throws an error should catch and log", async () => {
    const error = new Error("Disconnect failed");
    const disconnectMock = jest.fn().mockRejectedValue(error);

    (connector as any).isConnectedFlag = true;
    (connector as any).mongooseConnection = {
      disconnect: disconnectMock,
    };

    const result = await connector.disconnect();

    expect(Logger.error).toHaveBeenCalledWith({
      message: '❌ Mongoose disconnection error:',
      additionalInfo: error,
    });
    expect(result).toBe(false);
  });
});
