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
                        {/* Listado de sucursales simplificado */}
                        <div className="column is-4">
                            <p className="sucursal-item">Sucursal 1</p>
                        </div>
                        <div className="column is-4">
                            <p className="sucursal-item">Sucursal 2</p>
                        </div>
                        <div className="column is-4">
                            <p className="sucursal-item">Sucursal 3</p>
                        </div>
                        <div className="column is-4">
                            <p className="sucursal-item">Sucursal 4</p>
                        </div>
                        <div className="column is-4">
                            <p className="sucursal-item">Sucursal 5</p>
                        </div>
                        <div className="column is-4">
                            <p className="sucursal-item">Sucursal 6</p>
                        </div>
                    </div>
                </div>

                <div className="box has-text-centered mt-4">
                    <p>Trabajadores municipales de Rawson no se puede verificar en Bases</p>
                </div>

                <div className="columns is-centered mt-5">
                    <div className="column is-5">
                        <div className="card">
                            <div className="card-content">
                                <h3 className="title is-5">Plan STD</h3>
                                <h4>Score</h4>
                                <p>700 a 999: <span className="has-text-weight-bold">$300.000</span></p>
                                <p>400 a 699: <span className="has-text-weight-bold">$200.000</span></p>
                                <p>000 a 399: <span className="has-text-weight-bold">$150.000</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="column is-5">
                        <div className="card">
                            <div className="card-content">
                                <h3 className="title is-5">Plan DNI</h3>
                                <h4>Score</h4>
                                <p>700 a 999: <span className="has-text-weight-bold">$200.000</span></p>
                                <p>400 a 699: <span className="has-text-weight-bold">$150.000</span></p>
                                <p>000 a 399: <span className="has-text-weight-bold">$120.000</span></p>
                            </div>
                        </div>
                    </div>
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
