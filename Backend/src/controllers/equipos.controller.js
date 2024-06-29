import { connection } from '../database/database.js'

const postEquipo = async (peticion, respuesta) => {
    try {
        const equipo = peticion.body;
        const sql = "INSERT INTO equipos SET ?";
        const [registro] = await connection.query(sql, equipo);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Equipo registrado"
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
                message: "Equipo actualizado"
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
const getEquiposUnidad = async (peticion, respuesta) => {
    try {
        const {unidad} = peticion.params;
        const sql = `SELECT equipos.*,
                     categorias.nombre_categoria,
                     ubicaciones.ambiente,
                     ubicaciones.sitio,
                     unidades_productivas.nombre_unidad
                     FROM equipos
                     JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
                     JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                     JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                     WHERE nombre_unidad = ?
                     ORDER BY equipos.id_equipo DESC`;
        const [equipo] = await connection.query(sql, unidad);
        if (equipo.length > 0) {
            return respuesta.status(200).json(equipo)
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "No hay equipos en esta unidad"
            }) 
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};
const getTotalEquiposUnidad = async (peticion, respuesta) => {
    try {
        const {unidad} = peticion.params;
        const sql = `
                    SELECT COUNT(*) AS totalEquipos,
                     unidades_productivas.nombre_unidad
                     FROM equipos
                     JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                     JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
                     WHERE unidades_productivas.nombre_unidad = ?
                    `;
        const [equipos] = await connection.query(sql, unidad);
        const total = equipos[0].totalEquipos;
        respuesta.status(200).json(total);
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}

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

//traer el total de quipos por estado
const getEquiposEstado = async (peticion, respuesta) => {
    try {

        const sql = `SELECT COUNT(*) AS total,
                     estado FROM equipos 
                    GROUP BY equipos.estado`;
        const [resultado] = await connection.query(sql);
        if (resultado.length > 0) {
            return respuesta.status(200).json(resultado)
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

//listar equipos por estado
const getEquiposStatus = async (peticion, respuesta) => {
    try {
        const { estado } = peticion.params;
        const sql = `
            SELECT equipos.*,
                    categorias.nombre_categoria,
                    ubicaciones.ambiente,
                    ubicaciones.sitio,
                    unidades_productivas.nombre_unidad
                    FROM equipos
                    JOIN categorias ON categorias.id_categoria = equipos.fk_categoria
                    JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = ubicaciones.fk_unidad_productiva
            WHERE estado = ?
        `;
        const [equipos] = await connection.query(sql, estado);

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
}

const getTotal = async (peticion, respuesta) => {
    try {
        const sql = "SELECT COUNT(*) AS total_equipos FROM equipos";
        const [result] = await connection.query(sql);
        const total = result[0].total_equipos;
        respuesta.status(200).json({totalEquipos: total});
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}
const putEstado = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const {estado} = peticion.body;
        const sql = `UPDATE equipos SET estado = ? WHERE id_equipo =?`;
        const [updateState] = await connection.query(sql, [estado, id]);
        if (updateState.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Estado actualizado"
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "Equipo no encontrado"
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
    putEstado,
    getEquipo,
    getEquipos,
    getEquiposUnidad,
    getTotalEquiposUnidad,
    getEquiposEstado,
    getEquiposStatus,
    getTotal
}