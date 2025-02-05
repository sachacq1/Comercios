import { useState } from "react";
import { loginUser } from "../services/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate(); // Hook para redirigir después del login

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(email, password);
            if (response.token) {
                login(response.token); // Guardamos el token en el contexto
                navigate("/"); // Redirigimos al home o página principal
            } else {
                alert("El login falló. Intenta de nuevo.");
            }
        } catch (error) {
            console.error("Error en el inicio de sesión", error);
            console.log(error)
            alert("Error en el inicio de sesión. Verifica tus credenciales.");
        }
    }

    return (
        <div className="container has-text-centered p-5">
            <h1 className="title">Iniciar sesión</h1>
            <form onSubmit={handleLogin} className="box">
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Contraseña</label>
                    <div className="control">
                        <input
                            type="password"
                            className="input"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary is-fullwidth mb-3">
                            Iniciar sesión
                        </button>
                        {/* Cambié <a> por <Link> */}
                        <Link to="/register" className="button is-link is-fullwidth">
                            No tienes cuenta? Regístrate
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;
