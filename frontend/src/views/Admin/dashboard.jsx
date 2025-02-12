import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { addCcio, getCcio, updateCcio, deleteCcio } from "../../services/apiComercios.js";

const AdminComerciosList = () => {

    const [comercios, setComercios] = useState([]);
    const [formData, setFormData] = useState({
        _id: "",
        nombre: "",
        codigo: 0,
        descripcion: "",
        sucursales: [],
        bases: {
            siisa: false,
            riesgonet: false,
            pyp: false,
            bcra: false
        },
        planes: []
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
            _id: "",
            nombre: "",
            codigo: 0,
            descripcion: "",
            sucursales: [],
            bases: {
                siisa: false,
                riesgonet: false,
                pyp: false,
                bcra: false
            },
            planes: []
        });
        setIsEditing(false);
    };

    return (
        <>
            <div className="container">
                <h1 className="title is-3">Lista de Comercios</h1>

                {/* Formulario para agregar/completar comercio */}
                <div className="box">
                    <h2 className="subtitle is-4">{isEditing ? "Actualizar Comercio" : "Agregar Nuevo Comercio"}</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
                        <input type="number" placeholder="Código" value={formData.codigo} onChange={(e) => setFormData({ ...formData, codigo: parseInt(e.target.value) })} required />
                        <textarea placeholder="Descripción" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} required></textarea>

                        {/* Inputs dinámicos para sucursales */}
                        <h3>Sucursales</h3>
                        {formData.sucursales.map((sucursal, index) => (
                            <div key={index}>
                                <input type="text" placeholder="Nombre de la sucursal" value={sucursal.nombre} onChange={(e) => {
                                    const newSucursales = [...formData.sucursales];
                                    newSucursales[index].nombre = e.target.value;
                                    setFormData({ ...formData, sucursales: newSucursales });
                                }} />
                                <input type="text" placeholder="Dirección" value={sucursal.direccion} onChange={(e) => {
                                    const newSucursales = [...formData.sucursales];
                                    newSucursales[index].direccion = e.target.value;
                                    setFormData({ ...formData, sucursales: newSucursales });
                                }} />
                            </div>
                        ))}
                        <button type="button" onClick={() => setFormData({ ...formData, sucursales: [...formData.sucursales, { nombre: "", direccion: "" }] })}>Añadir Sucursal</button>

                        {/* Planes y Scores */}
                        <h3>Planes</h3>
                        {formData.planes.map((plan, pIndex) => (
                            <div key={pIndex}>
                                <select value={plan.nombre} onChange={(e) => {
                                    const newPlanes = [...formData.planes];
                                    newPlanes[pIndex].nombre = e.target.value;
                                    setFormData({ ...formData, planes: newPlanes });
                                }}>
                                    <option value="STD">STD</option>
                                    <option value="DNI">DNI</option>
                                </select>
                                {plan.scores.map((score, sIndex) => (
                                    <div key={sIndex}>
                                        <input type="number" placeholder="Min Score" value={score.min} onChange={(e) => {
                                            const newScores = [...plan.scores];
                                            newScores[sIndex].min = parseInt(e.target.value);
                                            const newPlanes = [...formData.planes];
                                            newPlanes[pIndex].scores = newScores;
                                            setFormData({ ...formData, planes: newPlanes });
                                        }} />
                                        <input type="number" placeholder="Max Score" value={score.max} onChange={(e) => {
                                            const newScores = [...plan.scores];
                                            newScores[sIndex].max = parseInt(e.target.value);
                                            const newPlanes = [...formData.planes];
                                            newPlanes[pIndex].scores = newScores;
                                            setFormData({ ...formData, planes: newPlanes });
                                        }} />
                                        <input type="number" placeholder="Monto" value={score.monto} onChange={(e) => {
                                            const newScores = [...plan.scores];
                                            newScores[sIndex].monto = parseInt(e.target.value);
                                            const newPlanes = [...formData.planes];
                                            newPlanes[pIndex].scores = newScores;
                                            setFormData({ ...formData, planes: newPlanes });
                                        }} />
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button type="button" onClick={() => setFormData({ ...formData, planes: [...formData.planes, { nombre: "STD", scores: [] }] })}>Añadir Plan</button>

                        <button type="submit">{isEditing ? "Actualizar Comercio" : "Guardar Comercio"}</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export { AdminComerciosList };
