import { connection } from '../database/database.js'

const postEquipo = async (peticion, respuesta) => {
    try {
        const equipo = peticion.body;
        const sql = "INSERT INTO equipos SET ?";
        const [registro] = await connection.query(sql, equipo);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Equipo registrado correctamente"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al registrar equipo"
            }) 
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putEquipo = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const equipo = peticion.body;
        const sql = "UPDATE equipos SET ? WHERE id_equipo = ?";
        const [actualizar] = await connection.query(sql, [equipo, id]);
        if (actualizar.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Equipo actualizado correctamente"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al actualizar equipo"
            }) 
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getEquipo = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const sql = `SELECT equipos.*,
                     categorias.nombre_categoria,
                     ubicaciones.ambiente,
                     ubicaciones.sitio,
                     unidades_productivas.nombre_unidad
                     FROM equipos
                     JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
                     JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                     JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                     WHERE id_equipo = ?`;
        const [equipo] = await connection.query(sql, id);
        if (equipo.length > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "equipo": equipo 
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontró el equipo"
            }) 
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getEquipos = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const sql = `SELECT equipos.*,
                    categorias.nombre_categoria,
                    ubicaciones.ambiente,
                    ubicaciones.sitio,
                    unidades_productivas.nombre_unidad
                    FROM equipos
                    JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
                    JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                    ORDER BY equipos.id_equipo DESC`;
        const [equipos] = await connection.query(sql, id);
        if (equipos.length > 0) {
            return respuesta.status(200).json(equipos)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontraron equipos"
            }) 
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putEstadoEquipo = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const {estado} = peticion.body;
        const sql = "UPDATE equipos SET estado = ? WHERE id_equipo = ?";
        const [updateEstado] = await connection.query(sql, [estado, id]);
        if (updateEstado.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Estado de equipo actualizado correctamente"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al actualizar estado de equipo"
            }) 
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};
export const equipos = {
    postEquipo,
    putEquipo,
    getEquipo,
    getEquipos,
    putEstadoEquipo
}