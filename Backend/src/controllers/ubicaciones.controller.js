import { connection } from '../database/database.js'

const postUbicacion = async (peticion, respuesta) => {
    try {
        const ubicacion = peticion.body;
        const sql = "INSERT INTO ubicaciones SET ?";
        const [registro] = await connection.query(sql, ubicacion);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Ubicación registrada"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al registrar ubicación"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putUbicacion = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const ubicacion = peticion.body;
        const sql = "UPDATE ubicaciones SET ? WHERE id_ubicacion = ?";
        const [actualizar] = await connection.query(sql, [ubicacion, id]);
        if (actualizar.affectedRows> 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Ubicación actualizada"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al actualizar Ubicación"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getUbicacion = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const sql = `SELECT ubicaciones.*, 
        unidades_productivas.nombre_unidad
        FROM ubicaciones
        JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
        WHERE id_ubicacion = ?`
        const [ubicacion] = await connection.query(sql, id);
        if (ubicacion.length > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "categoria": ubicacion
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontró la ubicación"
            })
        } 
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getUbicaciones = async (peticion, respuesta) => {
    try {
        const sql = `SELECT ubicaciones.*, 
                    unidades_productivas.nombre_unidad
                    FROM ubicaciones
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva 
                    ORDER BY ubicaciones.id_ubicacion DESC`
        const [ubicaciones] = await connection.query(sql);
        if (ubicaciones.length > 0) {
            return respuesta.status(200).json(ubicaciones)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontraron la ubicaciones"
            })
        } 
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};
const getUbicacionesUnidad = async (peticion, respuesta) => {
    try {
        const {unidad} = peticion.params;
        const sql = `SELECT ubicaciones.*, 
                    unidades_productivas.nombre_unidad
                    FROM ubicaciones
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva 
                    WHERE nombre_unidad = ?
                    ORDER BY ubicaciones.id_ubicacion DESC`
        const [ubicaciones] = await connection.query(sql, unidad);
        if (ubicaciones.length > 0) {
            return respuesta.status(200).json(ubicaciones)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No se encontraron la ubicaciones"
            })
        } 
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

export const ubicaciones = {
    postUbicacion,
    putUbicacion,
    getUbicacion,
    getUbicaciones,
    getUbicacionesUnidad
}