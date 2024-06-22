import { connection } from "../database/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const validationUser = async (peticion, respuesta) => {
    try {
        const {email, password} = peticion.body;
        //debemos traer el password del user para poder compararlo más adelante
        //la consulta la hacemos a través del email simplemente
        const sql = `
                    SELECT *,
                    fk_tipo_usuario as rol,
                    nombres,
                    unidades_productivas.nombre_unidad as unidad,
                    unidades_productivas.id_unidad,
                    password
                    FROM usuarios
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = usuarios.fk_unidad_productiva
                    WHERE email = ?
        `;
        const [resultado] = await connection.query(sql, [email]);
        
        if (resultado.length > 0) {
            const user = resultado[0];

            //comparar constraseña 
            //comparamos la contraseña que enviamos en el body con la que traemos del usuario a través de la función compare de bcrypt
            const validatePassword = await bcrypt.compare(password, user.password);

            if (validatePassword) {
                const token = jwt.sign({user: user.rol}, process.env.SECRET, {expiresIn: process.env.TIME});
                return respuesta.status(200).json({
                    "message": "Usuario autorizado",
                    "token": token,
                    "usuario": user.id_usuario,
                    "user": user.rol,
                    "unidad": user.unidad,
                    "nombres": user.nombres,
                    "id_unidad": user.id_unidad,
                    "estado": user.estado
                })
                
            }else {
                return respuesta.status(400).json({
                    "message": "Usuario no autorizado"
                });
            }

           
        } else {
            return respuesta.status(404).json({
                "message": "Usuario no encontrado"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};

export const validationToken = async (peticion, respuesta, next) => {
    try {
        const token_user = peticion.headers["token"];
        if (!token_user) {
            return respuesta.status(402).json({
                "message": "Token requerido"
            })
        } else {
            jwt.verify(token_user, process.env.SECRET, (error, decoded) => {
                if (error) {
                    return respuesta.status(402).json({
                        "message": "Token no valido"
                    })
                } else {
                    next();
                }
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
};