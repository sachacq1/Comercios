
import { MongoClient, ServerApiVersion } from "mongodb";

process.loadEnvFile(); // Carga las variables de entorno desde .env

const uri = process.env.ATLAS_URI;
let client;

export const connectDb = async () => {
    if (!client) {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        try {
            await client.connect();
            console.log("✅ Conectado a MongoDB Atlas");
        } catch (error) {
            console.error("❌ Error al conectar a MongoDB:", error);
            process.exit(1);
        }
    }
    return client;
};

export const getDB = () => {
    if (!client) {
        throw new Error("⚠️ La base de datos no está conectada. Llama a `connectDB()` primero.");
    }
    return client.db(); // Retorna la base de datos por defecto
};
