import { connection } from "../database/database.js";
import jwt from "jsonwebtoken";

export const validationUser = async (peticion, respuesta) => {
    try {
        const {email, password} = peticion.body;
        const sql = `
                    SELECT * FROM usuarios
                    WHERE email = '${email}' and password = '${password}'
        `;
        const [resultado] = await connection.query(sql);
        if (resultado.length > 0) {
            const token = jwt.sign({user: resultado}, process.env.SECRET, {expiresIn: process.env.TIME});
            return respuesta.status(200).json({
                "message": "Usuario autorizado",
                "token": token
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