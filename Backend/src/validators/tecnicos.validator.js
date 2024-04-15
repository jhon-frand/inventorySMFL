import { check, validationResult } from "express-validator"
import { connection } from "../database/database.js";

export const validationTecnico = () => {
    return [
        check('identificacion')
        .isNumeric().withMessage('la identificación debe ser numérica')
        .notEmpty().withMessage('la identificación no puede estar vacía')
        .isLength({min: 6, max: 10}).withMessage('Debe tener entre 6 y 10 caracteres')
        .custom( async (value) => {
            const sql = "SELECT * FROM tecnicos WHERE identificacion = ?";
            const [result] = await connection.query(sql, [value]);
            if (result.length > 0) {
                throw new Error("La identificación ya está en uso")
            }
        }),
        
        check('nombres')
        .isString().withMessage('los nombres deben ser texto')
        .notEmpty().withMessage('los nombres no pueden estar vacíos')
        .isLength({min: 3}).withMessage('Deben tener al menos tres caracteres'),

        check('apellidos')
        .isString().withMessage('los apellidos deben ser texto')
        .notEmpty().withMessage('los apellidos no pueden estar vacíos')
        .isLength({min: 3}).withMessage('Deben tener al menos tres caracteres'),

        check('correo')
        .isEmail().withMessage('el correo no es válido')
        .notEmpty().withMessage('el correo no puede estar vacío')
        .custom( async (value) => {
            const sql = "SELECT * FROM tecnicos WHERE correo = ?";
            const [result] = await connection.query(sql, [value]);
            if (result.length > 0) {
                throw new Error("El correo ya está en uso")
            }
        }),

        check('telefono')
        .isString().withMessage('el teléfono debe ser un string')
        .notEmpty().withMessage('el teléfono no puede estar vacío')
        .isLength({min: 10, max: 10}).withMessage('Debe tener diez números'),

        (peticion, respuesta, next) => {
            const errors = validationResult(peticion);
            if (!errors.isEmpty()) {
                const checkError = errors.array().map(errors => [
                    errors.path,
                    errors.msg
                ]);
                respuesta.status(400).json({
                    msg: checkError
                })
                return;
            }
            next();
        }
    ]
}