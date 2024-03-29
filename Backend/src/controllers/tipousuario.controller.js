import { connection } from "../database/database.js"

const getTipos = async (peticion, respuesta) => {
    try {
        const [tipos] = await connection.query("SELECT * FROM tipo_usuario");
        if (tipos.length > 0) {
            return respuesta.status(200).json(tipos)
        }
    } catch (error) {
        respuesta.send(error.message);
    }
}
export const tipos = {
    getTipos
}