import { connection } from "../database/database.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import dotenv from 'dotenv'

dotenv.config({path: './src/env/.env'});

const tokenPassword = async (peticion, respuesta) => {
    try {
        const { email } = peticion.body;
        const sql = "SELECT * FROM usuarios WHERE email = ?"
        const [user] = await connection.query(sql, email);
        if (user.length > 0) {
            console.log(user[0].id_usuario);
        } else {
            return respuesta.status(404).json({
                "message": "Usuario no encontrado"
            });
        }
        

        const token = jwt.sign({ id_usuario: user[0].id_usuario }, process.env.SECRET, { expiresIn: process.env.TIME });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Recuperar contraseña",
            text: `Hola, da click en el siguiente enlace para restablecer la contraseña http://localhost:5173/restablecer?token=${token}`
            //text: ` token= ${token}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return respuesta.status(500).json({
                    "message": "No se pudo enviar el correo"
                })
            }
            respuesta.send({
                "message": "correo enviado"
            })
        })
    } catch (error) {
        respuesta.status(500)
        respuesta.send(error.message)
    }
}

const resetPassword = async (peticion, respuesta) => {
    try {
        const { token, password } = peticion.body;

        const decoded = jwt.verify(token, process.env.SECRET);
        const user = decoded.id_usuario

        const sql = "SELECT * FROM usuarios WHERE id_usuario = ?"
        const [usuario] = await connection.query(sql, user)

        if (!usuario) {
            return respuesta.status(404).json({
                "message": "Usuario no encontrado"
            })
        }

         // Encriptar la nueva contraseña antes de actualizarla
         const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(password, saltRounds);


        const sqlUpdate = "UPDATE usuarios SET password = ? WHERE id_usuario = ?";
        const [actualizar] = await connection.query(sqlUpdate, [hashedPassword, user]);

        if (actualizar.affectedRows > 0) {
            return respuesta.status(200).json({
                "message": "Contraseña actualizada"
            })
        }
    } catch (error) {
        respuesta.status(500);
        respuesta.send(error.message);
    }
}

export const contraseña = {
    tokenPassword,
    resetPassword
}
