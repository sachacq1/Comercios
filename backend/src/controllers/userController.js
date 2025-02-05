import User, { register, login } from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Registro de usuario
const registerUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;  // Asegura que "role" también se puede recibir
        const data = { username, password, email, role };

        const user = await register(data);
        if (user === null) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }

        // Generar token después de registrar
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({ message: "Usuario registrado con éxito", user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Inicio de sesión
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const token = await login({ email, password });
        return res.json({ token });

    } catch (error) {
        console.error(error);
        if (error.message === "El correo no está registrado" || error.message === "Contraseña o usuario incorrecto") {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

export { registerUser, loginUser };
