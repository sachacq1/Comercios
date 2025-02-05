import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

process.loadEnvFile()

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Acceso denegado " });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
        req.user = decoded;  // Aseguramos que el usuario decodificado esté disponible en la request
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
};

// Middleware de verificación de rol admin
const isAdmin = async (req, res, next) => {
    try {
        // Busca el usuario por ID, usando el ID del usuario en el token decodificado
        const user = await User.findById(req.user.id);

        // Verifica si el rol del usuario es admin
        if (!user || user.role !== "admin") {
            return res.status(403).json({ error: "No tienes permisos de administrador" });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Error al verificar el rol del usuario" });
    }
};

export { authMiddleware, isAdmin };
