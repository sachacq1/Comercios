import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCcio, getCcio, updateCcio, deleteCcio } from "../../services/apiComercios.js";

const AdminComerciosList = () => {
    const [comercios, setComercios] = useState([]);
    const [formData, setFormData] = useState({
        _id: "",
        nombre: "",
        codigo: 0,
        descripcion: "",
        sucursales: [],
        planes: []
    });
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

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
            planes: []
        });
        setIsEditing(false);
    };

    const handleAddSucursal = () => {
        setFormData({
            ...formData,
            sucursales: [...formData.sucursales, { nombre: "", direccion: "" }]
        });
    };

    const handleSucursalChange = (index, field, value) => {
        const updatedSucursales = [...formData.sucursales];
        updatedSucursales[index][field] = value;
        setFormData({ ...formData, sucursales: updatedSucursales });
    };

    const handleAddPlan = (nombre) => {
        if (!formData.planes.some(plan => plan.nombre === nombre)) {
            setFormData({
                ...formData,
                planes: [...formData.planes, { nombre, scores: [] }]
            });
        }
    };

    const handleAddScore = (planIndex) => {
        const updatedPlanes = [...formData.planes];
        updatedPlanes[planIndex].scores.push({ min: 0, max: 0, monto: 0 });
        setFormData({ ...formData, planes: updatedPlanes });
    };

    const handleScoreChange = (planIndex, scoreIndex, field, value) => {
        const updatedPlanes = [...formData.planes];
        updatedPlanes[planIndex].scores[scoreIndex][field] = value;
        setFormData({ ...formData, planes: updatedPlanes });
    };

    const handleGoToDetails = (id) => {
        navigate(`/comercio/${id}`);
    };

    return (
        <>
            <div className="container">
                <h1 className="title is-3">Lista de Comercios</h1>
                <div className="columns is-multiline">
                    {comercios.map((comercio) => (
                        <div key={comercio._id} className="column is-4">
                            <div className="card">
                                <div className="card-content">
                                    <h3 className="title is-5">{comercio.nombre}</h3>
                                    <p><strong>Código:</strong> {comercio.codigo}</p>
                                    <p><strong>Descripción:</strong> {comercio.descripcion}</p>
                                    <div className="buttons is-right">
                                        <button className="button is-warning" onClick={() => handleEdit(comercio)}>Editar</button>
                                        <button className="button is-danger" onClick={() => handleDelete(comercio._id)}>Eliminar</button>
                                        <button className="button is-info" onClick={() => handleGoToDetails(comercio._id)}>Ver Detalles</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="box">
                    <h2 className="subtitle is-4">{isEditing ? "Actualizar Comercio" : "Agregar Nuevo Comercio"}</h2>
                    <form onSubmit={handleSubmit}>
                        <input className="input" type="text" placeholder="Nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
                        <input className="input" type="number" placeholder="Código" value={formData.codigo} onChange={(e) => setFormData({ ...formData, codigo: parseInt(e.target.value) })} required />
                        <textarea className="textarea" placeholder="Descripción" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} required />
                        <button type="button" className="button is-link" onClick={handleAddSucursal}>Agregar Sucursal</button>
                        {formData.sucursales.map((sucursal, index) => (
                            <div key={index}>
                                <input className="input" type="text" placeholder="Nombre Sucursal" value={sucursal.nombre} onChange={(e) => handleSucursalChange(index, 'nombre', e.target.value)} />
                                <input className="input" type="text" placeholder="Dirección" value={sucursal.direccion} onChange={(e) => handleSucursalChange(index, 'direccion', e.target.value)} />
                            </div>
                        ))}
                        <button type="button" className="button is-link" onClick={() => handleAddPlan("STD")}>Agregar Plan STD</button>
                        <button type="button" className="button is-link" onClick={() => handleAddPlan("DNI")}>Agregar Plan DNI</button>
                        <button className="button is-primary" type="submit">{isEditing ? "Actualizar Comercio" : "Guardar Comercio"}</button>
                        <button className="button is-light" type="button" onClick={resetForm}>Cancelar</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export { AdminComerciosList };
