import 'reflect-metadata';
import { getConnection, createConnection, Connection } from 'typeorm';
import { Anime } from '@entities/Anime';
import { Description } from '@entities/Description';
import { Torrent } from '@entities/Torrent';
import { Video } from '@entities/Video';
import dotenv from "dotenv"
dotenv.config();
const port = Number(process.env.DATABASE_PORT) || 3306;
const username = process.env.DATABASE_USERNAME || '';
const password = process.env.DATABASE_PASSWORD || '';
const database = process.env.DATABASE_NAME || '';
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
                username,
                password,
                schema: "tatakae",
                database,
                entities: [Anime, Description, Video, Torrent],
                synchronize: true,
                logging: false
            });

            return connection;
        })();
    }

    return connectionReadyPromise;
};