import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoutes = ({ children }) => {
    const { authToken } = useAuth();

    if (!authToken) {
        return <Navigate to="/login" />
    }

    return children
}

export default PrivateRoutes