import { check, validationResult} from "express-validator"
import { connection } from "../database/database.js"

export const validationUsuario = () => {
    return[

        check('identificacion')
        .isNumeric().withMessage('la identificación debe ser numérica')
        .notEmpty().withMessage('la identificación no puede estar vacía')
        .isLength({min: 6, max: 10}).withMessage('Debe tener entre 6 y 10 caracteres')
        .custom( async (value) => {
            const sql = "SELECT * FROM usuarios WHERE identificacion = ?";
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

        check('email')
        .isEmail().withMessage('El correo no es válido')
        .notEmpty().withMessage('El correo no puede estar vacío')
        .custom(async (value) => {
            const sql = "SELECT * FROM usuarios WHERE email = ?";
            const [result] = await connection.query(sql, [value]);
            if (result.length > 0) {
                throw new Error("El email ya está en uso")
            }
        }),

        check('telefono')
        .isString().withMessage('El teléfono debe ser un string')
        .notEmpty().withMessage('El teléfono no puede estar vacío')
        .isLength({min: 10, max: 10}).withMessage('Debe tener 10 números'),


        check('estado')
        .isString().withMessage('El estado debe ser texto')
        .notEmpty().withMessage('El estado no puede estar vacíos')
        .isLength({min: 6}).withMessage('Debe tener al menos seis caracteres'),

        check('fk_tipo_usuario')
        .isNumeric().withMessage('la fk_tipo_usuario debe ser numérica')
        .notEmpty().withMessage('la fk_tipo_usuario no puede estar vacía'),

        check('fk_unidad_productiva')
        .isNumeric().withMessage('la fk_unidad_productiva debe ser numérica')
        .notEmpty().withMessage('la fk_unidad_productiva no puede estar vacía'),

        check('password')
        .isString().withMessage('la contraseña debe ser texto')
        .notEmpty().withMessage('la contraseña no puede estar vacíos')
        .isLength({min: 6}).withMessage('Debe tener al menos seis caracteres'),

        (peticion, respuesta, next) => {
            const errores = validationResult(peticion);

            if (!errores.isEmpty()) {
                const chekError = errores.array().map(errores => [
                    errores.path,
                    errores.msg
                ])
                respuesta.status(400).json({
                    msg: chekError
                })
                return;
            }
            next();
        }
    ]
}
export const validationPutUsuario = () => {
    return[

        check('identificacion')
        .isNumeric().withMessage('la identificación debe ser numérica')
        .notEmpty().withMessage('la identificación no puede estar vacía')
        .isLength({min: 6, max: 10}).withMessage('Debe tener entre 6 y 10 números'),
        
        check('nombres')
        .isString().withMessage('los nombres deben ser texto')
        .notEmpty().withMessage('los nombres no pueden estar vacíos')
        .isLength({min: 3}).withMessage('Deben tener al menos tres caracteres'),

        check('apellidos')
        .isString().withMessage('los apellidos deben ser texto')
        .notEmpty().withMessage('los apellidos no pueden estar vacíos')
        .isLength({min: 3}).withMessage('Deben tener al menos tres caracteres'),

        check('email')
        .isEmail().withMessage('El correo no es válido')
        .notEmpty().withMessage('El correo no puede estar vacío'),

        check('telefono')
        .isString().withMessage('el teléfono debe ser un string')
        .notEmpty().withMessage('el teléfono no puede estar vacío')
        .isLength({min: 10, max: 10}).withMessage('Debe tener diez números'),

        check('estado')
        .isString().withMessage('el estado debe ser texto')
        .notEmpty().withMessage('el estado no puede estar vacíos')
        .isLength({min: 6}).withMessage('Debe tener al menos seis caracteres'),

        check('fk_tipo_usuario')
        .isNumeric().withMessage('la fk_tipo_usuario debe ser numérica')
        .notEmpty().withMessage('la fk_tipo_usuario no puede estar vacía'),

        check('fk_unidad_productiva')
        .isNumeric().withMessage('la fk_unidad_productiva debe ser numérica')
        .notEmpty().withMessage('la fk_unidad_productiva no puede estar vacía'),

        (peticion, respuesta, next) => {
            const errores = validationResult(peticion);

            if (!errores.isEmpty()) {
                const chekError = errores.array().map(errores => [
                    errores.path,
                    errores.msg
                ])
                respuesta.status(400).json({
                    msg: chekError
                })
                return;
            }
            next();
        }
    ]
}