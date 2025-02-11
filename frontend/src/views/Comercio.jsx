import { getCcioById } from "../services/apiComercios.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Comercio.css'

const Comercio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [comercio, setComercio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchComercio(id);
        }
    }, [id]);

    const fetchComercio = async (id) => {
        try {
            const data = await getCcioById(id);
            setComercio(data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener el comercio", error);
            setError("Error al obtener el comercio.");
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="has-text-centered">Cargando...</div>;
    }

    if (error) {
        return <div className="has-text-centered">{error}</div>;
    }

    return (
        <div className="container">
            <h1 className="title is-3 has-text-centered mb-5">Detalles del Comercio</h1>

            <div className="box">
                <h3 className="title is-4">{comercio ? comercio.nombre : "Comercio no encontrado"}</h3>
                <p className="subtitle is-6 truncated-text">{comercio ? comercio.descripcion : "Descripción no disponible"}</p>
                <p>
                    <strong>Código:</strong> <span className="tag is-info">{comercio ? comercio.codigo : "N/A"}</span>
                </p>
                <h3 className="mt-5">Bases: Siisa - Riesgonet - PyP - BCRA</h3>

                <div className="mt-4">
                    <h3 className="is-size-4">Sucursales</h3>
                    <div className="columns is-multiline">
                        {comercio.sucursales && comercio.sucursales.map((sucursal, index) => (
                            <div className="column is-4" key={index}>
                                <p className="sucursal-item">{sucursal.nombre} - {sucursal.direccion}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="box has-text-centered mt-4">
                    <p>Trabajadores municipales de Rawson no se puede verificar en Bases</p>
                </div>

                <div className="columns is-centered mt-5">
                    {comercio.plan && comercio.plan.map((plan, index) => (
                        <div className="column is-5" key={index}>
                            <div className="card">
                                <div className="card-content">
                                    <h3 className="title is-5">{plan.nombre}</h3>
                                    <h4>Score</h4>
                                    {plan.scores.map((score, scoreIndex) => (
                                        <p key={scoreIndex}>{score.min} a {score.max}: <span className="has-text-weight-bold">${score.monto.toLocaleString()}</span></p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <h3 className="is-size-4">Bases</h3>
                    <ul>
                        {comercio.bases.siisa && <li>Siisa: Sí</li>}
                        {!comercio.bases.siisa && <li>Siisa: No</li>}
                        {comercio.bases.riesgonet && <li>Riesgonet: Sí</li>}
                        {!comercio.bases.riesgonet && <li>Riesgonet: No</li>}
                        {comercio.bases.pyp && <li>PyP: Sí</li>}
                        {!comercio.bases.pyp && <li>PyP: No</li>}
                        {comercio.bases.bcra && <li>BCRA: Sí</li>}
                        {!comercio.bases.bcra && <li>BCRA: No</li>}
                    </ul>
                </div>
            </div>

            <div className="buttons is-centered mt-4">
                <button className="button is-primary" onClick={() => navigate('/')}>
                    Volver al Home
                </button>
            </div>
        </div>
    );
};

export { Comercio };
