import comercioModel from "../models/comercioModel.js";

const getAllCcio = async (req, res) => {
    try {
        const comercios = await comercioModel.getAllCcio();
        res.status(200).json(comercios);

    } catch (error) {
        res.status(500).json(error.message);

    }
};

const addComercio = async (req, res) => {
    const { nombre, codigo, descripcion, bases, plan, sucursales } = req.body
    if (!nombre || !codigo || !descripcion) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" })
    }

    try {
        const newComercio = await comercioModel.addCcio({ nombre, codigo, descripcion, bases, plan, sucursales });
        return res.status(201).json({ message: "Comercio creado con exito", comercio: newComercio });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getCcioById = async (req, res) => {
    const { id } = req.params
    try {
        const comercio = await comercioModel.getCcioById(id)
        if (!comercio) { return res.status(404).json({ error: "Comercio no encontrado" }) }

        return res.json(comercio)
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const updateCcio = async (req, res) => {
    const { id } = req.params
    const { nombre, codigo, descripcion, bases, plan, sucursales } = req.body
    try {
        const comercio = await comercioModel.updateCcio(id, { nombre, codigo, descripcion, bases, plan, sucursales })
        if (!comercio) return res.status(404).json({ error: "Comercio no encontrado" })
        res.json({ message: "Comercio actualizado con exito", comercio })
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const deleteCcio = async (req, res) => {
    const { id } = req.params
    try {
        const deleteCcio = await comercioModel.deleteCcio(id)
        if (!deleteCcio) return res.status(404).json({ error: "Comercio no encontrado" })
        res.json({ message: "Comercio eliminado con exito", comercio: deleteCcio })

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message);
    }
}

export { getAllCcio, addComercio, getCcioById, updateCcio, deleteCcio }