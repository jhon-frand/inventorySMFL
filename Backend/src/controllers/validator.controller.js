import { connection } from "../database/database.js";
import jwt from "jsonwebtoken";

export const validationUser = async (peticion, respuesta) => {
    try {
        const {email, password} = peticion.body;
        const sql = `
                    SELECT *,
                    fk_tipo_usuario as rol,
                    nombres,
                    unidades_productivas.nombre_unidad as unidad,
                    unidades_productivas.id_unidad
                    FROM usuarios
                    JOIN unidades_productivas ON unidades_productivas.id_unidad = usuarios.fk_unidad_productiva
                    WHERE email = '${email}' and password = '${password}'
        `;
        const [resultado] = await connection.query(sql);
        
        if (resultado.length > 0) {
            const user = resultado[0].rol
            const unidad = resultado[0].unidad
            const nombres = resultado[0].nombres
            const idUnidad = resultado[0].id_unidad
            const idUser = resultado[0].id_usuario
            const estadoUser = resultado[0].estado

            const token = jwt.sign({user: resultado}, process.env.SECRET, {expiresIn: process.env.TIME});
            return respuesta.status(200).json({
                "message": "Usuario autorizado",
                "token": token,
                "usuario": idUser,
                "user": user,
                "unidad": unidad,
                "nombres": nombres,
                "id_unidad": idUnidad,
                "estado": estadoUser
            })
        } else {
            return respuesta.status(400).json({
                "message": "Usuario no autorizado"
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