import { connection} from '../database/database.js'

const postUnidad = async (peticion, respuesta) => {
    try {
        const unidad = peticion.body;
        const sql = "INSERT INTO unidades_productivas SET ?";
        let [registro] = await connection.query(sql, unidad);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                message: "Unidad Productiva registrada"
            });
        } else {
            return respuesta.status(403).json({
                "status": 403,
                message: "No se pudo registrar la unidad productiva"
            });
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putUnidad = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const unidad = peticion.body;
        const sql = "UPDATE unidades_productivas SET ? WHERE id_unidad = ?";
        const [actualizar] = await connection.query(sql, [unidad, id]);
        if (actualizar.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Unidad Productiva actualizada"
               
            });
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "No se pudo actualizar la unidad productiva"
            });
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getUnidades = async (peticion, respuesta) => {
    try {
        const sql = "SELECT * FROM unidades_productivas ORDER BY unidades_productivas.id_unidad DESC"
        const [unidades] = await connection.query(sql);
        if (unidades.length > 0) {
            return respuesta.status(200).json(unidades);
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "No se encontraron unidades productivas"
            });
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getUnidad = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const sql = "SELECT * FROM unidades_productivas WHERE id_unidad = ?";
        const [unidad] = await connection.query(sql, id);
        if (unidad.length > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "unidad": unidad
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "No se encontró la unidad productiva"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

export const getTotal = async (peticion, respuesta) => {
    try {
        const sql = "SELECT COUNT(*) AS total_unidades FROM unidades_productivas";
        const [result] = await connection.query(sql);
        const total = result[0].total_unidades;
        respuesta.status(200).json({totalUnidades: total})
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message)
    }
}

export const getTotalEquipos = async (peticion, respuesta) => {
    try {
        const {unit} = peticion.params;
        const sql = `
                    SELECT COUNT(*) AS total_equipos FROM equipos
                    JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                    WHERE unidades_productivas.nombre_unidad = ?            
        `;
        const [result] = await connection.query(sql, unit);
        respuesta.status(200).json(result[0])
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}

export const unidades = {
    postUnidad,
    putUnidad,
    getUnidades,
    getUnidad,
    getTotal,
    getTotalEquipos
}