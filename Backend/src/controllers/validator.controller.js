import { connection } from '../database/database.js';
import jswt from 'jsonwebtoken';


export const ValidarUsuario = async (req, res) => {
    try {
        let { email, password } = req.body;
        let sql = `select id_usuario, nombres from usuarios where email = '${email}' and password = '${password}'`;
        let [rows] = await connection.query(sql);

        console.log([rows])

        if (rows.length > 0) {
            let token = jswt.sign({ user: rows[0] }, process.env.SECRET, { expiresIn: process.env.TIME });
            return res.status(200).json({ "message": "Usuario autorizado", "token": token });
        } else {
            return res.status(404).json({ "message": "Usuario no autorizadooo" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
};


export const validarToken = async(req, res, next) => {
    try {
        let token_cliente = req.headers['token'];
        if (!token_cliente) {
            return res.status(402).json({"message": "el token es requerido"});
        } else {
            let decode = jswt.verify(token_cliente, process.env.SECRET, (error, decoded) => {
                if (error) {
                    return res.status(402).json({"message": "el token invalido"});
                } else {
                    req.user = decoded.user;
                    next();
                }
            });
        }
    } catch (error) {
        return res.status(500).json({"message": error.message});
    }
}