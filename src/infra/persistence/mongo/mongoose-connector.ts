import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import { IDataBaseConnector } from "../IDataBaseConnector";
import { mongoConfig } from "@config/variables/mongo";
import { Logger } from "@infra/utils/logger/Logger";


export class MongooseConnector implements IDataBaseConnector {
    private static instance: MongooseConnector;
    private mongooseConnection: Mongoose;
    private isConnectedFlag: boolean = false;
  
    private constructor() {}

    public static getInstance(): IDataBaseConnector {
        if (!MongooseConnector.instance) {
            MongooseConnector.instance = new MongooseConnector();
        }
        return MongooseConnector.instance;
    }

    public async connect(): Promise<boolean> {
        if (this.isConnectedFlag) return true;

        try {
            const {
                database,
                host,
                pass,
                port,
                user,
            } = mongoConfig

            const options: ConnectOptions = {
                dbName: database,
            }

            Logger.info({
                message: '🔌 Connecting to MongoDB with Mongoose...'
            });
            Logger.info({
                message: `🔌 MongoDB URI: mongodb+srv://${user}:${pass}@${host}:${port}/${database}`
            });

            this.mongooseConnection = await mongoose.connect(
                `mongodb+srv://${user}:${pass}@${host}:${port}`,
                options
            );
            this.isConnectedFlag = true;
            Logger.info({ message: '✅ Connected to MongoDB with Mongoose' });
            return true;
        } catch (error: any) {
            Logger.error({ message: '❌ Mongoose connection error:', additionalInfo: error });
            return false;
        }
    }

    public isConnected(): boolean {
        return this.isConnectedFlag && this.mongooseConnection.connection.readyState === 1;
    }

    public async disconnect(): Promise<boolean> {
        if (!this.isConnectedFlag) return true;
        try {
            await this.mongooseConnection.disconnect();
            this.isConnectedFlag = false;
            Logger.info({ message: '🔌 Disconnected from MongoDB with Mongoose'});
            return true;
        } catch (error) {
            Logger.error({
                message: '❌ Mongoose disconnection error:', 
                additionalInfo: error
            });
            return false;
        }
    }
}