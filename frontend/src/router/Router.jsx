import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from "../views/login.jsx";
import Register from "../views/Register.jsx";
import App from "../App";
import PrivateRoute from '../components/PrivateRoutes.jsx';
import PublicRoute from '../components/PublicRoute.jsx';
import { Comercio } from '../views/Comercio.jsx';
import { useAuth } from '../context/authContext.jsx';
import { AdminComerciosList } from '../views/Admin/dashboard.jsx';
import AdminRoute from '../components/AdminRoute.jsx';

const AppRouter = () => {
    const { isAuthenticated, role } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta pública: login */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                {/* Ruta pública: register */}
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/* Ruta protegida: home */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute> {/* Componente para proteger la ruta de home */}
                            <App />
                        </PrivateRoute>
                    }
                />
                <Route path="/comercio/:id"
                    element={
                        <PrivateRoute>
                            <Comercio />
                        </PrivateRoute>
                    }
                />
                {/* Ruta protegida: admin dashboard (solo si es admin) */}
                <Route
                    path="/admin/comercios"
                    element={
                        <AdminRoute>
                            <AdminComerciosList />
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export { AppRouter };