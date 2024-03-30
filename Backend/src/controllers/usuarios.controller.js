import { connection } from '../database/database.js'

const postUsuario = async (peticion, respuesta) => {
    try {
        const usuario = peticion.body;
        const sql = "INSERT INTO usuarios SET ?";
        const [registro] = await connection.query(sql, usuario);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Usuario registrado correctamente"
            })
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "Error al registrar usuario"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putUsuario = async (peticion, respuesta) => {
        try {
            const {id} = peticion.params;
            const usuario = peticion.body;
            const sql = "UPDATE usuarios SET ? WHERE id_usuario = ?";
            const [actualizar] = await connection.query(sql, [usuario, id]);
            if (actualizar.affectedRows > 0) {
                return respuesta.status(200).json({
                    "status": 200,
                    message: "Usuario actualizado correctamente"
                })
            } else {
                return respuesta.status(404).json({
                    "status": 404,
                    "message": "Error al actualizar usuario, no se encontró el usuario"
                })
            }
        } catch (error) {
            respuesta.status(500);
            respuesta.send(error.message);
        }
};

const getUsuario = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const sql = `SELECT usuarios.*,
                    tipo_usuario.rol,
                    unidades_productivas.nombre_unidad
                    FROM usuarios
                    JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = usuarios.fk_tipo_usuario
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = usuarios.fk_unidad_productiva
                    WHERE id_usuario = ?`;
        const [usuario] = await connection.query(sql, id);
        if (usuario.length > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Usuario encontrado",
                "usuario": usuario
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "Usuario no encontrado"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const getUsuarios = async (peticion, respuesta) => {
    try {
        const sql = `SELECT usuarios.*,
                    tipo_usuario.rol,
                    unidades_productivas.nombre_unidad
                    FROM usuarios
                    JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = usuarios.fk_tipo_usuario
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = usuarios.fk_unidad_productiva
                    ORDER BY usuarios.id_usuario DESC`;
        const [usuarios] = await connection.query(sql);
        if (usuarios.length > 0) {
            return respuesta.status(200).json(usuarios)
        } else {
            return respuesta.status(403).json({
                "status": 403,
                "message": "error al listar los usuarios"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const putEstado = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const {estado} = peticion.body;
        const sql = `UPDATE usuarios SET estado = ? WHERE id_usuario =?`;
        const [updateState] = await connection.query(sql, [estado, id]);
        if (updateState.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Estado de Usuario actualizado correctamente"
            })
        } else {
            return respuesta.status(404).json({
                "status": 404,
                "message": "Usuario no encontrado"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

const totalUsers = async (peticion, respuesta) => {
    try {
        const sql = "SELECT COUNT(*) AS total_usuarios FROM usuarios"
        const [result] = await connection.query(sql);
        const total = result[0].total_usuarios;
            respuesta.status(200).json({totalUsuarios: total})
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}

export const usuarios = {
    postUsuario,
    putUsuario,
    getUsuario,
    getUsuarios,
    putEstado,
    totalUsers
}