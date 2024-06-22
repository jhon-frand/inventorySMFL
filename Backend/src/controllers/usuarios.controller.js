import { connection } from '../database/database.js'
import bcrypt from "bcrypt"

const postUsuario = async (peticion, respuesta) => {
    try {
        const usuario = peticion.body;

        //encriptar la contraseña antes de guardarla
        const saltRounds = 10;
        const contraseñaEncriptada = await bcrypt.hash(usuario.password, saltRounds)
        usuario.password =  contraseñaEncriptada;

        const sql = "INSERT INTO usuarios SET ?";
        const [registro] = await connection.query(sql, usuario);
        if (registro.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                message: "Usuario registrado"
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
                    message: "Usuario actualizado"
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

const verifyPassword = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
       const {password} = peticion.body;

        const sql = `SELECT * FROM usuarios WHERE id_usuario = ?`;
        const [user] = await connection.query(sql, id) 

        if (user.length > 0) {

            const dataUser = user[0];
            const passwordUser = dataUser.password;
            
            const comparePassword = await bcrypt.compare(password, passwordUser);

            if (comparePassword) {
                return respuesta.status(200).json({ message: "Contraseña correcta" });
            } else {
                return respuesta.status(401).json({ message: "Contraseña incorrecta" });
            }
        } else {
            return respuesta.status(404).json({ message: "Usuario no encontrado" });
        }
        

    } catch (error) {
        respuesta.status(500)
        respuesta.send(error.message)
    }
}


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

const putPassword = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const {password} = peticion.body;

          // Encriptar la nueva contraseña antes de actualizarla
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        const sql = `UPDATE usuarios SET password = ? WHERE id_usuario =?`;
        const [updatePassword] = await connection.query(sql, [hashedPassword, id]);
        if (updatePassword.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Contraseña actualizada"
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
const putEstado = async (peticion, respuesta) => {
    try {
        const {id} = peticion.params;
        const {estado} = peticion.body;
        const sql = `UPDATE usuarios SET estado = ? WHERE id_usuario =?`;
        const [updateState] = await connection.query(sql, [estado, id]);
        if (updateState.affectedRows > 0) {
            return respuesta.status(200).json({
                "status": 200,
                "message": "Estado de Usuario actualizado"
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
    verifyPassword,
    getUsuario,
    putPassword,
    getUsuarios,
    putEstado,
    totalUsers
}