import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

process.loadEnvFile();
const JWT_SECRET = process.env.JWT_SECRET;

// Definir el esquema para el usuario
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: [4, "El nombre de usuario debe tener al menos 4 caracteres"],
            maxlength: [30, "El nombre de usuario no puede tener más de 30 caracteres"],
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, "Por favor ingresa un correo electrónico válido"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


const User = mongoose.model("User", userSchema);


// Función para registrar usuario
const register = async (data) => {
    try {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return null;
        }

        const hashPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({
            username: data.username,
            password: hashPassword,
            email: data.email,
            role: data.role || "user",
        });

        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error("Error al registrar usuario " + error.message);
    }
};

// Función para iniciar sesión y devolver un token
const login = async (data) => {
    try {
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new Error("El correo no está registrado");
        }

        const matchPassword = await bcrypt.compare(data.password, user.password);
        if (!matchPassword) {
            throw new Error("Contraseña o usuario incorrecto");
        }

        // Generar token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return token;
    } catch (error) {
        throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
};

// Exportar correctamente
export { register, login };
export default User;