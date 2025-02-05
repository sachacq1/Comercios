import { connectDB } from "./src/config/mongo.js";
import express from "express";
import { comercioRouter } from "./src/routes/comercioRouter.js";
import { userRouter } from "./src/routes/userRouter.js";
import cors from "cors";
import { checkJwtSecret } from "./src/middlewares/envMiddleware.js";

process.loadEnvFile();
const PORT = process.env.PORT

const app = express();
app.use(express.json());
app.use(cors())

app.use(checkJwtSecret)

app.use("/api/comercios", comercioRouter)
app.use("/api/users", userRouter)
app.use("/*", (req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" })

})

app.listen(PORT, () => {
    connectDB()
    console.log("Servidor en escucha en puerto" + PORT)
})