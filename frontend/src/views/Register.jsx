import { useState } from "react";
import { registerUser } from "../services/auth.js";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await registerUser(username, email, password);
            alert("Usuario registrado con exito")
        } catch (error) {
            console.error("Error al registrar usuario", error);
            alert(error.message);
        }
    }

    return <div className="container has-text-centered">
        <h1 className="title">Registrar Usuario</h1>
        <form onSubmit={handleRegister} className="box">
            <div className="field">
                <label className="label">Usuario</label>
                <div className="control">
                    <input
                        type="text"
                        className="input"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Correo Electrónico</label>
                <div className="control">
                    <input
                        type="email"
                        className="input"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button type="submit" className="button is-primary is-fullwidth">
                        Registrar
                    </button>
                </div>
            </div>
        </form>
    </div>

};

export default Register;