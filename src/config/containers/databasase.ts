import { IDataBaseConnector } from "@infra/persistence/IDataBaseConnector";
import { MongooseConnector } from "@infra/persistence/mongo/mongoose-connector";
import { container } from "tsyringe";

container.registerInstance<IDataBaseConnector>('DataBaseConnector', MongooseConnector.getInstance())