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
        scoreSTD: [],
        scoreDNI: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [hasScoreSTD, setHasScoreSTD] = useState(false);
    const [hasScoreDNI, setHasScoreDNI] = useState(false);

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
        setHasScoreSTD(comercio.scoreSTD.length > 0);
        setHasScoreDNI(comercio.scoreDNI.length > 0);
    };

    const resetForm = () => {
        setFormData({
            _id: "",
            nombre: "",
            codigo: 0,
            descripcion: "",
            sucursales: [],
            scoreSTD: [],
            scoreDNI: [],
        });
        setIsEditing(false);
        setHasScoreSTD(false);
        setHasScoreDNI(false);
    };

    const handleScoreChange = (e, scoreType, index, field) => {
        const updatedScores = [...formData[scoreType]];
        updatedScores[index][field] = parseInt(e.target.value);
        setFormData({ ...formData, [scoreType]: updatedScores });
    };

    const addScore = (scoreType) => {
        const newScore = { min: 0, max: 0, monto: 0 };
        setFormData({ ...formData, [scoreType]: [...formData[scoreType], newScore] });
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
                        <input className="input" name="codigo" type="number" placeholder="Código" value={formData.codigo} onChange={(e) => setFormData({ ...formData, codigo: parseInt(e.target.value) })} required />

                        <label className="label">Descripción</label>
                        <textarea className="textarea" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} required />

                        {/* Preguntar si tiene score STD */}
                        <label className="checkbox">
                            <input type="checkbox" checked={hasScoreSTD} onChange={(e) => setHasScoreSTD(e.target.checked)} />
                            Tiene score STD
                        </label>

                        {hasScoreSTD && (
                            <>
                                {formData.scoreSTD.map((score, index) => (
                                    <div key={index} className="field is-grouped">
                                        <input className="input" type="number" placeholder="Min" value={score.min} onChange={(e) => handleScoreChange(e, "scoreSTD", index, "min")} required />
                                        <input className="input" type="number" placeholder="Max" value={score.max} onChange={(e) => handleScoreChange(e, "scoreSTD", index, "max")} required />
                                        <input className="input" type="number" placeholder="Monto" value={score.monto} onChange={(e) => handleScoreChange(e, "scoreSTD", index, "monto")} required />
                                    </div>
                                ))}
                                <button type="button" className="button is-link" onClick={() => addScore("scoreSTD")}>Agregar Rango STD</button>
                            </>
                        )}

                        {/* Preguntar si tiene score DNI */}
                        <label className="checkbox">
                            <input type="checkbox" checked={hasScoreDNI} onChange={(e) => setHasScoreDNI(e.target.checked)} />
                            Tiene score DNI
                        </label>

                        {hasScoreDNI && (
                            <>
                                {formData.scoreDNI.map((score, index) => (
                                    <div key={index} className="field is-grouped">
                                        <input className="input" type="number" placeholder="Min" value={score.min} onChange={(e) => handleScoreChange(e, "scoreDNI", index, "min")} required />
                                        <input className="input" type="number" placeholder="Max" value={score.max} onChange={(e) => handleScoreChange(e, "scoreDNI", index, "max")} required />
                                        <input className="input" type="number" placeholder="Monto" value={score.monto} onChange={(e) => handleScoreChange(e, "scoreDNI", index, "monto")} required />
                                    </div>
                                ))}
                                <button type="button" className="button is-link" onClick={() => addScore("scoreDNI")}>Agregar Rango DNI</button>
                            </>
                        )}

                        <button className="button is-primary" type="submit">{isEditing ? "Actualizar Comercio" : "Guardar Comercio"}</button>
                        <button className="button is-light" type="button" onClick={resetForm}>Cancelar</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export { AdminComerciosList };
