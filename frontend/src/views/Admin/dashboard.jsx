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
        scoreSTD: { min: 0, max: 0, monto: 0 },
        scoreDNI: { min: 0, max: 0, monto: 0 }
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
            scoreSTD: { min: 0, max: 0, monto: 0 },
            scoreDNI: { min: 0, max: 0, monto: 0 }
        });
        setIsEditing(false);
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="box">
                    <h2 className="subtitle is-4">{isEditing ? "Actualizar Comercio" : "Agregar Nuevo Comercio"}</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="label">Nombre</label>
                        <input className="input" name="nombre" type="text" placeholder="Nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />

                        <label className="label">Código</label>
                        <input className="input" name="codigo" type="number" placeholder="Código" value={formData.codigo} onChange={(e) => setFormData({ ...formData, codigo: parseInt(e.target.value) })} required style={{ appearance: "textfield", MozAppearance: "textfield" }} />

                        <label className="label">Descripción</label>
                        <textarea className="textarea" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} required />

                        {/* Plan STD */}
                        <h3 className="subtitle is-5">Plan STD</h3>
                        <div className="field is-grouped">
                            {!(formData.scoreSTD.min === 0 && formData.scoreSTD.max === 0) && (
                                <>
                                    <input className="input" name="std-min" type="number" placeholder="Min" value={formData.scoreSTD.min} onChange={(e) => setFormData({ ...formData, scoreSTD: { ...formData.scoreSTD, min: parseInt(e.target.value) } })} required />
                                    <input className="input" name="std-max" type="number" placeholder="Max" value={formData.scoreSTD.max} onChange={(e) => setFormData({ ...formData, scoreSTD: { ...formData.scoreSTD, max: parseInt(e.target.value) } })} required />
                                </>
                            )}
                            <input className="input" name="std-monto" type="number" placeholder="Monto" value={formData.scoreSTD.monto} onChange={(e) => setFormData({ ...formData, scoreSTD: { ...formData.scoreSTD, monto: parseInt(e.target.value) } })} required />
                        </div>

                        {/* Plan DNI */}
                        <h3 className="subtitle is-5">Plan DNI</h3>
                        <div className="field is-grouped">
                            {!(formData.scoreDNI.min === 0 && formData.scoreDNI.max === 0) && (
                                <>
                                    <input className="input" name="dni-min" type="number" placeholder="Min" value={formData.scoreDNI.min} onChange={(e) => setFormData({ ...formData, scoreDNI: { ...formData.scoreDNI, min: parseInt(e.target.value) } })} required />
                                    <input className="input" name="dni-max" type="number" placeholder="Max" value={formData.scoreDNI.max} onChange={(e) => setFormData({ ...formData, scoreDNI: { ...formData.scoreDNI, max: parseInt(e.target.value) } })} required />
                                </>
                            )}
                            <input className="input" name="dni-monto" type="number" placeholder="Monto" value={formData.scoreDNI.monto} onChange={(e) => setFormData({ ...formData, scoreDNI: { ...formData.scoreDNI, monto: parseInt(e.target.value) } })} required />
                        </div>

                        <button className="button is-primary" type="submit">{isEditing ? "Actualizar Comercio" : "Guardar Comercio"}</button>
                        <button className="button is-light" type="button" onClick={resetForm}>Cancelar</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export { AdminComerciosList };
