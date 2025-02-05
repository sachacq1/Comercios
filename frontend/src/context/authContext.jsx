import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || null); // Guardar el rol en el estado

    const checkTokenExpiration = (token) => {
        try {
            const decoded = jwtDecode(token); // Decodifica el JWT para obtener la fecha de expiración
            const currentTime = Date.now() / 1000; // Tiempo actual en segundos
            return decoded.exp < currentTime; // Si el token ha expirado, devuelve true
        } catch (error) {
            return true; // Si no se puede decodificar el token, lo tratamos como expirado
        }
    }

    useEffect(() => {
        // Si hay un token y está expirado, cerramos la sesión automáticamente
        if (authToken && checkTokenExpiration(authToken)) {
            logout();
        }
        // Si hay un token, decodificamos y obtenemos el rol
        if (authToken) {
            const decoded = jwtDecode(authToken);
            setRole(decoded.role);  // Supón que el rol está en el JWT
            localStorage.setItem("role", decoded.role);  // Guardamos el rol en localStorage
        }
    }, [authToken]);

    const login = (token) => {
        localStorage.setItem("token", token);
        // Decodificamos el token y extraemos el rol
        const decoded = jwtDecode(token);
        setAuthToken(token);
        setRole(decoded.role);  // Asignamos el rol del token al estado
        localStorage.setItem("role", decoded.role); // Guardamos el rol en localStorage
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role"); // Limpiamos el rol también
        setAuthToken(null);
        setRole(null); // Limpiamos el rol en el estado
    };

    return (
        <AuthContext.Provider value={{ authToken, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
