import axios from "axios";

const apiCcio = axios.create({
    baseURL: "https://comercios-production.up.railway.app/api",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

const getCcio = async () => {
    try {
        const response = await apiCcio.get("/comercios");
        return response.data
    } catch (error) {
        throw new Error("Error al obtener los comercios");
    }
}

const addCcio = async (newCcio) => {
    try {
        const response = await apiCcio.post("/comercios/admin", newCcio);

        alert("Comercio creado con exito")
        return response.data
    } catch (error) {
        console.error("Error al crear comercio", error)
        alert("Error al crear comercio")
        throw error
    }
};

const updateCcio = async (id, updateCcio) => {
    try {
        const response = await apiCcio.put(`/comercios/admin/${id}`, updateCcio);
        alert("Comercio actualizado con exito")
        return response.data
    } catch (error) {
        console.error("Error al actualizar comercio", error)
        throw error
    }
}

const deleteCcio = async (id) => {
    try {
        const response = await apiCcio.delete(`/comercios/admin/${id}`);
        return response.data
    } catch (error) {
        console.error("Error al eliminar comercio", error)
        throw error
    }
}

const getCcioById = async (id) => {
    try {
        const response = await apiCcio.get(`/comercios/${id}`)
        return response.data
    } catch (error) {
        console.error("error al obtener el comercio")
        throw error
    }
}
export { getCcio, addCcio, updateCcio, deleteCcio, getCcioById }