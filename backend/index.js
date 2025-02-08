import { connectDB } from "./src/config/mongo.js";
import { connectDb } from "./src/config/atlasMongo.js";
import express from "express";
import { comercioRouter } from "./src/routes/comercioRouter.js";
import { userRouter } from "./src/routes/userRouter.js";
import cors from "cors";
import { checkJwtSecret } from "./src/middlewares/envMiddleware.js";

// process.loadEnvFile();
const PORT = process.env.PORT || 4000
console.log(PORT)

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://comercios-theta.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(checkJwtSecret)

app.use("/api/comercios", comercioRouter)
app.use("/api/users", userRouter)
app.use("/*", (req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" })

})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor en escucha en puerto ${PORT}`);
    });
}).catch(err => {
    console.error("❌ No se pudo iniciar el servidor:", err);
});

//app.listen(PORT, () => {
//    connectDb()
//    console.log("Servidor en escucha en puerto" + PORT)
//})