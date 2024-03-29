import { connection } from "../database/database.js";

const postTecnico = async (peticion, respuesta) => {
    try {
        const tecnico = peticion.body;
        const sql = "INSERT INTO tecnicos SET ?";
        const [registro] = await connection.query(sql, tecnico);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Técnico registrado correctamente"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al registrar técnico"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putTecnico = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const tecnico = peticion.body;
        const sql = "UPDATE tecnicos SET ? WHERE id_tecnico = ?";
        const [actualizar] = await connection.query(sql, [tecnico, id]);
        if (actualizar.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Técnico actualizado correctamente"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al actualizar Técnico"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getTecnicos = async (peticion, respuesta) => {
    try {
        const sql = "SELECT * FROM tecnicos ORDER BY tecnicos.id_tecnico DESC";
        const [tecnicos] = await connection.query(sql);
        if (tecnicos.length > 0) {
            return respuesta.status(200).json(tecnicos)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontraron tecnicos"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getTecnico = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const sql = "SELECT * FROM tecnicos WHERE id_tecnico = ?";
        const [tecnico] = await connection.query(sql, id);
        if (tecnico.length > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "técnico": tecnico 
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontró el técnico"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

export const tecnicos = {
   postTecnico,
   putTecnico,
   getTecnicos,
   getTecnico
}