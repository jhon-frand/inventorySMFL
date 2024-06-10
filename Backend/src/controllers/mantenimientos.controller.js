import { connection } from "../database/database.js";

const postMantenimiento = async (peticion, respuesta) => {
    try {
        const mantenimiento = peticion.body;
        const sql = "INSERT INTO mantenimientos SET ?";
        const [registro] = await connection.query(sql, mantenimiento);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Mantenimiento registrado"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                message: "Error al registrar mantenimiento"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putMantenimiento = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;
        const mantenimiento = peticion.body;
        const sql = "UPDATE mantenimientos SET ? WHERE id_mantenimiento = ?";
        const [actualizar] = await connection.query(sql, [mantenimiento, id]);
        if (actualizar.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Mantenimiento actualizado"
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
                    usuarios.apellidos AS apellidos,
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

const getMantenimientoUnidad = async (peticion, respuesta) => {
    try {
        const { unidad } = peticion.params;
        const sql = `
                    SELECT mantenimientos.*,
                    usuarios.nombres AS usuario,
                    usuarios.apellidos AS apellidos,
                    equipos.nombre_equipo,
                    unidades_productivas.nombre_unidad AS nombre_unidad
                    FROM mantenimientos 
                    JOIN usuarios ON usuarios.id_usuario = mantenimientos.fk_user_responsable
                    JOIN equipos ON equipos.id_equipo = mantenimientos.fk_equipo
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = usuarios.fk_unidad_productiva
                    WHERE nombre_unidad = ? 
                    ORDER BY mantenimientos.id_mantenimiento DESC           
        `;
        const [resultado] = await connection.query(sql, unidad)
        if (resultado.length > 0) {
            return respuesta.status(200).json(resultado)
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}

const getTotalMantenimientoUnidad = async (peticion, respuesta) => {
    try {
        const { unidad } = peticion.params;
        const sql = `
                    SELECT COUNT(*) AS totalMantenimientos,
                    unidades_productivas.nombre_unidad
                    FROM  mantenimientos
                    JOIN usuarios ON usuarios.id_usuario = mantenimientos.fk_user_responsable
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = usuarios.fk_unidad_productiva
                    WHERE unidades_productivas.nombre_unidad = ?
        `;
        const [mantenimientos] = await connection.query(sql, unidad);
        const total = mantenimientos[0].totalMantenimientos;
        respuesta.status(200).json(total);
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}
const getMantenimiento = async (peticion, respuesta) => {
    try {
        const { id } = peticion.params;
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
const getTypeMantenimiento = async (peticion, respuesta) => {
    try {
        const sql = `
                SELECT tipo_mantenimiento, COUNT(*) AS total_mantenimientos
                FROM mantenimientos
                GROUP BY tipo_mantenimiento;
                    `;
        const [mantenimiento] = await connection.query(sql);
        if (mantenimiento.length > 0) {
            return respuesta.status(200).json( mantenimiento)
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
        respuesta.status(200).json({ totalMantenimientos: total })
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}

const getTotalMantenimientoUnidadType = async (peticion, respuesta) => {
    try {
        const sql = `
                 SELECT 
                     unidades_productivas.nombre_unidad,
                     SUM(CASE WHEN mantenimientos.tipo_mantenimiento = 'preventivo' THEN 1 ELSE 0 END) AS total_preventivos,
                     SUM(CASE WHEN mantenimientos.tipo_mantenimiento = 'técnico' THEN 1 ELSE 0 END) AS total_tecnicos
                FROM mantenimientos
                JOIN usuarios ON usuarios.id_usuario = mantenimientos.fk_user_responsable
                JOIN unidades_productivas ON unidades_productivas.id_unidad = usuarios.fk_unidad_productiva
                GROUP BY unidades_productivas.nombre_unidad;
                `;
            
        const [result] = await connection.query(sql);
        if (result.length > 0) {
            return respuesta.status(200).json(result);
        }

    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}

export const mantenimientos = {
    postMantenimiento,
    putMantenimiento,
    getMantenimientos,
    getMantenimientoUnidad,
    getTotalMantenimientoUnidad,
    getMantenimiento,
    getTotal,
    getTotalMantenimientoUnidadType,
    getTypeMantenimiento,
}