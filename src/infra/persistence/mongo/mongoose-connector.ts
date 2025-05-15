import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import { IDataBaseConnector } from "../IDataBaseConnector";
import { mongoConfig } from "@config/variables/mongo";


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

            console.log('🔌 Connecting to MongoDB with Mongoose...');
            console.log(`🔌 MongoDB URI: mongodb://${user}:${pass}@${host}:${port}/${database}`);

            this.mongooseConnection = await mongoose.connect(
                `mongodb://${user}:${pass}@${host}:${port}`,
                options
            );
            this.isConnectedFlag = true;
            console.log('✅ Connected to MongoDB with Mongoose');
            return true;
        } catch (error) {
            console.error('❌ Mongoose connection error:', error);
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
            console.log('🔌 Disconnected from MongoDB with Mongoose');
            return true;
        } catch (error) {
            console.error('❌ Mongoose disconnection error:', error);
            return false;
        }
    }
}