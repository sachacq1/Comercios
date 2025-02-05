import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const AdminRoute = ({ children }) => {
    const { token, role } = useAuth();

    // Si no es admin o no está autenticado, redirige al home
    if (!token || role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;
