import { useAuth } from "./context/authContext";
import { ComerciosList } from "./components/ComerciosList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AdminComerciosList } from "./views/Admin/dashboard";

const App = () => {
  const { logout, role, authToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Sesión cerrada con éxito");
    navigate("/login"); // Redirigir al login después de cerrar sesión
  };

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  return (
    <div className="container p-5">
      <div className="columns is-centered">
        <div className="column">

          <h1 className="title is-3 has-text-centered">Lista de Comercios</h1>

          {/* Mostrar AdminComerciosList solo si el usuario es admin */}
          {role === "admin" ? (
            <AdminComerciosList />
          ) : (
            <div className="box">
              {/* Mostrar ComerciosList si no es admin */}
              <ComerciosList />
            </div>
          )}
        </div>
      </div>
      {/* Botón de Cerrar sesión */}
      <div className="columns is-vcentered is-centered">
        <div className="column is-narrow">
          <button className="button is-danger is-small is-fullwidth mb-5" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>



    </div>
  );
};

export default App;
