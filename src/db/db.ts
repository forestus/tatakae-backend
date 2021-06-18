import 'reflect-metadata';
import { getConnection, createConnection, Connection } from 'typeorm';
import { Anime } from '@entities/Anime';
import { Description } from '@entities/Description';
import { Torrent } from '@entities/Torrent';
import { Video } from '@entities/Video';
import dotenv from "dotenv"
import path from 'path';
const config = path.resolve(__dirname + '/../../config/.env')
console.log(config);
dotenv.config({
    path: config
});
const port = Number(process.env.DATABASE_PORT) || 3306;
const username = process.env.DATABASE_USERNAME || '';
const password = process.env.DATABASE_PASSWORD || '';
const database = process.env.DATABASE_NAME || '';
const schema = process.env.DATABASE_SCHEMA || 'public';
const host = process.env.DATABASE_HOST || '';
let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = () => {
    if (!connectionReadyPromise) {
        connectionReadyPromise = (async () => {
            // clean up old connection that references outdated hot-reload classes
            try {
                const staleConnection = getConnection();
                await staleConnection.close();
            } catch (error) {
                // no stale connection to clean up
            }

            // wait for new default connection
            const connection = await createConnection({
                type: 'postgres',
                port,
                ssl: { rejectUnauthorized: false },
                host,
                username,
                password,
                schema,
                database,
                entities: [Anime, Description, Video, Torrent],
                logging: false
            });

            return connection;
        })();
    }

    return connectionReadyPromise;
};