import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { addCcio, getCcio, updateCcio, deleteCcio } from "../../services/apiComercios.js";

const AdminComerciosList = () => {

    const [comercios, setComercios] = useState([]);
    const [formData, setFormData] = useState({
        _id: "",
        nombre: "",
        codigo: 0,
        descripcion: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        fetchComercios();
    }, []);

    const fetchComercios = async () => {
        try {
            const data = await getCcio();
            setComercios(data);
        } catch (error) {
            console.error("Error al obtener los productos", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateCcio(formData._id, formData);
            } else {
                console.log(formData);
                await addCcio(formData);
            }

            fetchComercios();
        } catch (error) {
            console.error("Error al guardar comercio", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Estas seguro de eliminar el comercio?")) {
            try {
                await deleteCcio(id);
                fetchComercios();
            } catch (error) {
                console.error("Error al eliminar comercio", error);
            }
        }
    };

    const handleEdit = (comercio) => {
        setFormData(comercio);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({
            id: "",
            nombre: "",
            codigo: 0,
            descripcion: ""
        });
        setIsEditing(false);
    };

    // Función para redirigir a la página de detalles de un comercio
    const handleGoToDetails = (id) => {
        navigate(`/comercio/${id}`); // Redirige a la página de detalles del comercio
    };

    return (
        <>
            <div className="container">
                <h1 className="title is-3">Lista de Comercios</h1>

                {/* Lista de Comercios */}
                <div className="columns is-multiline">
                    {comercios.map((comercio) => (
                        <div key={comercio._id} className="column is-4">
                            <div className="card">
                                <div className="card-content">
                                    <h3 className="title is-5">{comercio.nombre}</h3>
                                    <p><strong>Código:</strong> {comercio.codigo}</p>
                                    <p><strong>Descripción:</strong> {comercio.descripcion}</p>

                                    {/* Botones de Editar, Eliminar y Ver Detalles */}
                                    <div className="buttons is-right">
                                        <button
                                            className="button is-warning"
                                            onClick={() => handleEdit(comercio)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="button is-danger"
                                            onClick={() => handleDelete(comercio._id)}
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            className="button is-info"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleGoToDetails(comercio._id)} // Llama a la función de redirección
                                        >
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Formulario para agregar/completar comercio */}
                <div className="box">
                    <h2 className="subtitle is-4">{isEditing ? "Actualizar Comercio" : "Agregar Nuevo Comercio"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Nombre</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Nombre del comercio"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Código</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="Código del comercio"
                                    value={formData.codigo}
                                    onChange={(e) => setFormData({ ...formData, codigo: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Descripción</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="Descripción del comercio"
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-primary" type="submit">
                                    {isEditing ? "Actualizar Comercio" : "Guardar Comercio"}
                                </button>
                            </div>
                            <div className="control">
                                <button
                                    className="button is-light"
                                    type="button"
                                    onClick={resetForm}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export { AdminComerciosList };
