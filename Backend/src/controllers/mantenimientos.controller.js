import { connection } from "../database/database.js";

const postMantenimiento = async (peticion, respuesta) => {
    try {
        const mantenimiento = peticion.body;
        const sql = "INSERT INTO mantenimientos SET ?";
        const [registro] = await connection.query(sql, mantenimiento);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Mantenimiento registrado correctamente"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al registrar mantenimiento"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putMantenimiento = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const mantenimiento = peticion.body;
        const sql = "UPDATE mantenimientos SET ? WHERE id_mantenimiento = ?";
        const [actualizar] = await connection.query(sql, [mantenimiento, id]);
        if (actualizar.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Mantenimiento actualizado correctamente"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al actualizar mantenimiento"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getMantenimientos = async (peticion, respuesta) => {
    try {
        const sql = `SELECT mantenimientos.*,
                    usuarios.nombres AS usuario,
                    equipos.nombre_equipo
                    FROM mantenimientos
                    JOIN usuarios ON usuarios.id_usuario = mantenimientos.fk_user_responsable
                    JOIN equipos ON equipos.id_equipo = mantenimientos.fk_equipo
                    ORDER BY mantenimientos.id_mantenimiento DESC`;
        const [mantenimientos] = await connection.query(sql);
        if (mantenimientos.length > 0) {
            return respuesta.status(200).json(mantenimientos)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontraron mantenimientos"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getMantenimiento = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const sql = "SELECT * FROM mantenimientos WHERE id_mantenimiento = ?";
        const [mantenimiento] = await connection.query(sql, id);
        if (mantenimiento.length > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "mantenimiento": mantenimiento 
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontró el mantenimiento"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getTotal = async (peticion, respuesta) => {
    try {
        const sql = "SELECT COUNT(*) AS total_mantenimientos FROM mantenimientos";
        const [result] = await connection.query(sql);
        const total = result[0].total_mantenimientos;
        respuesta.status(200).json({totalMantenimientos: total})
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}

export const mantenimientos = {
    postMantenimiento,
    putMantenimiento,
    getMantenimientos,
    getMantenimiento,
    getTotal
}