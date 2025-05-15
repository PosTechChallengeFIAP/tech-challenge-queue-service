import env from 'env-var'

export const mongoConfig = Object.freeze({
    host: env.get('MONGO_HOST').asString(),
    port: env.get('MONGO_PORT').asString(),
    user: env.get('MONGO_USER').asString(),
    pass: env.get('MONGO_PASS').asString(),
    database: env.get('MONGO_DB').asString(),
    tlsCaFile: env.get('MONGO_TLS_CA_FILE').asString(),
})