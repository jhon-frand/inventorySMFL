import { connection } from "../database/database.js";

const postActividad = async (peticion, respuesta) => {
    try {
        const actividad = peticion.body;
        const sql = "INSERT INTO actividades SET ?";
        const [registro] = await connection.query(sql, actividad);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Actividad registrado correctamente"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al registrar Actividad"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putActividad = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const actividad = peticion.body;
        const sql = "UPDATE actividades SET ? WHERE id_actividad = ?";
        const [actualizar] = await connection.query(sql, [actividad, id]);
        if (actualizar.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Actividad actualizada correctamente"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al actualizar Actividad"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getActividades = async (peticion, respuesta) => {
    try {
        const sql = `SELECT actividades.*,
                    mantenimientos.tipo_mantenimiento,
                    mantenimientos.descripcion AS descripcion_mantenimiento,
                    tecnicos.nombres AS nombre_tecnico,
                    equipos.nombre_equipo,
                    usuarios.nombres AS responsable
                    FROM actividades
                    JOIN mantenimientos ON mantenimientos.id_mantenimiento = actividades.fk_mantenimiento
                    JOIN tecnicos ON tecnicos.id_tecnico = actividades.fk_tecnico
                    JOIN equipos ON equipos.id_equipo = mantenimientos.fk_equipo
                    JOIN usuarios ON usuarios.id_usuario = mantenimientos.fk_user_responsable
                    ORDER BY actividades.id_actividad DESC`;
        const [actividades] = await connection.query(sql);
        if (actividades.length > 0) {
            return respuesta.status(200).json(actividades)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontraron Actividades"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getActividad = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const sql = `SELECT actividades.*,
        mantenimientos.tipo_mantenimiento,
        mantenimientos.descripcion AS descripcion_mantenimiento,
        tecnicos.nombres AS nombre_tecnico,
        equipos.nombre_equipo,
        usuarios.nombres AS responsable
        FROM actividades
        JOIN mantenimientos ON mantenimientos.id_mantenimiento = actividades.fk_mantenimiento
        JOIN tecnicos ON tecnicos.id_tecnico = actividades.fk_tecnico
        JOIN equipos ON equipos.id_equipo = mantenimientos.fk_equipo
        JOIN usuarios ON usuarios.id_usuario = mantenimientos.fk_user_responsable
        WHERE id_actividad = ?`;
        const [actividad] = await connection.query(sql, id);
        if (actividad.length > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "actividad": actividad 
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontró la Actividad"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

export const actividades = {
   postActividad,
   putActividad,
   getActividades,
   getActividad
}