import mongoose from "mongoose";


const comercioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    codigo: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
}, {
    versionKey: false

}
);

const Comercio = mongoose.model("Comercio", comercioSchema);

const getAllCcio = async () => {
    try {
        const comercios = await Comercio.find();
        return comercios
    } catch (error) {
        throw new Error("Error al obtener los comercios" + error.message);
    }
};

const addCcio = async (dataCcio) => {
    try {
        const newComercio = new Comercio(dataCcio);
        await newComercio.save();
        return newComercio
    } catch (error) {
        throw new Error("Error al crear comercio" + error.message);

    }
};


const getCcioById = async (id) => {
    try {
        const comercio = await Comercio.findById(id);
        return comercio
    } catch (error) {
        throw new Error("Error al obtener comercio por id" + error.message);
    }

}

const updateCcio = async (id, dataCcio) => {
    try {
        const comercioUpdate = await Comercio.findByIdAndUpdate(id, dataCcio, { new: true });
        return comercioUpdate
    } catch (error) {
        throw new Error("Error al actualizar comercio" + error.message);
    }
}

const deleteCcio = async (id) => {
    try {
        const comercioDelete = await Comercio.findByIdAndDelete(id);
        if (!comercioDelete) throw new Error("Comercio no encontrado");
        return comercioDelete
    } catch (error) {
        throw new Error("Error al eliminar comercio" + error.message);

    }
}
export default { getAllCcio, addCcio, getCcioById, updateCcio, deleteCcio }