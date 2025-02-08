import mongoose from "mongoose";

// process.loadEnvFile()

//const URI_DB = process.env.URI_DB;

const URI_DB = process.env.ATLAS_URI;
console.log("🔍 ATLAS_URI:", process.env.ATLAS_URI);

const connectDB = async () => {
    try {
        await mongoose.connect(URI_DB);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log("Error al conectar a la base de datos", error)

    }
}

export { connectDB }