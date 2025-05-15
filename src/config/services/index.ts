import { Server } from "./server"
import { Logger } from "@infra/utils/logger/Logger"
import { MongooseConnector } from "@infra/persistence/mongo/mongoose-connector"

(async () => {
    const dbConnected = await MongooseConnector.getInstance().connect()
    if(!dbConnected) {
        Logger.error({
            message: '[APP] - Databasee connection failed',
        })
        process.exit()
    }

    const serverInitialized = Server.getInstance().inititalize()
    if(!serverInitialized) {
        Logger.error({
            message: '[APP] - Server initialization failed',
        })
        process.exit()
    }
})()