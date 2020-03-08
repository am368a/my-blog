import { Logger, MongoClient } from "mongodb";

const MONGO_URL = "mongodb://localhost:27017";
const DEFAULT_DB = "my-blog";
let client;
const connect = async ( dbName = DEFAULT_DB ) => {
    client = await MongoClient.connect( MONGO_URL, {
        useNewUrlParser: true,
    } );
    Logger.setLevel( "error" );
    return client.db( dbName );
};

const disconnect = async () => client.close();

export const exec = async ( ops, res ) => {
    try {
        const db = await connect();
        await ops( db );
        await disconnect();
    } catch ( e ) {
        res
            .status( 500 )
            .send( e );
    }
};
