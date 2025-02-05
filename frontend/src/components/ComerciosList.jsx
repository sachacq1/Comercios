import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { getCcio } from "../services/apiComercios.js";
import { useAuth } from "../context/authContext.jsx"; // Importar useAuth

const ComerciosList = () => {

    const [comercios, setComercios] = useState([]);
    const navigate = useNavigate(); // Inicializar useNavigate
    const { role } = useAuth(); // Obtener el rol del usuario desde el contexto

    useEffect(() => {
        fetchComercios();
    }, []);

    const fetchComercios = async () => {
        try {
            const data = await getCcio();
            setComercios(data);
        } catch (error) {
            console.error("Error al obtener los comercios", error);
        }
    };

    // Función para redirigir a la página de detalles de un comercio
    const handleGoToDetails = (id) => {
        navigate(`/comercio/${id}`); // Redirige a la página de detalles del comercio
    };

    // Función para redirigir a la página de admin
    const handleGoToAdmin = () => {
        navigate("/admin/comercios"); // Redirige a la página de administración
    };

    return (
        <>
            <div className="container">
                <h1 className="title is-3">Lista de Comercios</h1>

                {/* Lista de Comercios */}
                <div className="columns is-multiline">
                    {comercios.map((comercio) => (
                        <div key={comercio._id} className="column is-4">
                            <div className="card" style={{ cursor: "pointer" }} onClick={() => handleGoToDetails(comercio._id)}>
                                <div className="card-content">
                                    <h3 className="title is-5">{comercio.nombre}</h3>
                                    <p><strong>Código:</strong> {comercio.codigo}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export { ComerciosList };
