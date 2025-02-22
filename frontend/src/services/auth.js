import axios from 'axios'

const loginUser = async (email, password) => {

    try {
        const response = await axios.post("https://comercios-production.up.railway.app/api/users/login", { email, password })
        return response.data
    } catch (error) {
        throw new Error("credenciales incorrectas", error)
    }
}

const registerUser = async (username, email, password) => {
    try {
        await axios.post("https://comercios-production.up.railway.app/api/users/register", { username, email, password })
        location.href = "/login"
    } catch (error) {
        throw new Error("Error al registrar usuario", error)
    }
}

export { loginUser, registerUser }