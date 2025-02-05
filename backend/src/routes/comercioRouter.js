import { Router } from "express";
import { getAllCcio, addComercio, getCcioById, updateCcio, deleteCcio } from "../controllers/comercioController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const comercioRouter = Router();

// Rutas públicas accesibles para todos los usuarios
comercioRouter.get("/", getAllCcio);
comercioRouter.get("/:id", getCcioById);

// Rutas protegidas por autenticación
comercioRouter.use(authMiddleware);

// Rutas de administración (solo accesibles por admin)
comercioRouter.get("/admin", isAdmin, getAllCcio);
comercioRouter.get("/admin/:id", isAdmin, getCcioById);
comercioRouter.post("/admin", isAdmin, addComercio);
comercioRouter.put("/admin/:id", isAdmin, updateCcio);
comercioRouter.delete("/admin/:id", isAdmin, deleteCcio);

export { comercioRouter };
