import { connection } from "../database/database.js";

const postActividad = async (peticion, respuesta) => {
    try {
        const actividad = peticion.body;
        const sql = "INSERT INTO actividades SET ?";
        const [registro] = await connection.query(sql, actividad);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Actividad registrada"
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
                message: "Actividad actualizada"
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
const getActividadesUnit = async (peticion, respuesta) => {
    try {
        const {unidad} = peticion.params;
        const sql = `SELECT actividades.*,
                    mantenimientos.tipo_mantenimiento,
                    mantenimientos.descripcion AS descripcion_mantenimiento,
                    tecnicos.nombres AS nombre_tecnico,
                    equipos.nombre_equipo,
                    usuarios.nombres AS responsable,
                    unidades_productivas.nombre_unidad
                    FROM actividades
                    JOIN mantenimientos ON mantenimientos.id_mantenimiento = actividades.fk_mantenimiento
                    JOIN tecnicos ON tecnicos.id_tecnico = actividades.fk_tecnico
                    JOIN equipos ON equipos.id_equipo = mantenimientos.fk_equipo
                    JOIN usuarios ON usuarios.id_usuario = mantenimientos.fk_user_responsable
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = usuarios.fk_unidad_productiva
                    WHERE nombre_unidad = ?
                    ORDER BY actividades.id_actividad DESC`;
        const [actividades] = await connection.query(sql, unidad);
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

const getActividadesMantenimiento =  async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const sql = `
                    SELECT actividades.*,
                    mantenimientos.id_mantenimiento,
                    tecnicos.nombres,
                    tecnicos.apellidos
                    FROM actividades
                    JOIN tecnicos ON tecnicos.id_tecnico = actividades.fk_tecnico
                    JOIN mantenimientos ON mantenimientos.id_mantenimiento = actividades.fk_mantenimiento
                    WHERE id_mantenimiento = ?
        `; 
        const [resultado] = await connection.query(sql, id);

        if (resultado.length > 0 ) {
            return respuesta.status(200).json(resultado);
        } else {
            return respuesta.status(404).json({message: "No hay actividades aún"});
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error);
    }
}



export const actividades = {
   postActividad,
   putActividad,
   getActividades,
   getActividadesUnit,
   getActividad,
   getActividadesMantenimiento
}