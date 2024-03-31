import { check, validationResult } from "express-validator"

export const validationTecnico = () => {
    return [
        check('identificacion')
        .isNumeric().withMessage('la identificación debe ser numérica')
        .notEmpty().withMessage('la identificación no puede estar vacía')
        .isLength({min: 6}).withMessage('la identificación debe tener al menos 6 caracteres'),
        
        check('nombres')
        .isString().withMessage('los nombres deben ser texto')
        .notEmpty().withMessage('los nombres no pueden estar vacíos')
        .isLength({min: 3}).withMessage('los nombres deben tener al menos tres caracteres'),

        check('apellidos')
        .isString().withMessage('los apellidos deben ser texto')
        .notEmpty().withMessage('los apellidos no pueden estar vacíos')
        .isLength({min: 3}).withMessage('los apellidos deben tener al menos tres caracteres'),

        check('correo')
        .isEmail().withMessage('el correo no es válido')
        .notEmpty().withMessage('el correo no puede estar vacío'),

        check('telefono')
        .isString().withMessage('el teléfono debe ser un string')
        .notEmpty().withMessage('el teléfono no puede estar vacío'),

        (peticion, respuesta, next) => {
            const errors = validationResult(peticion);
            if (!errors.isEmpty()) {
                const checkError = errors.array().map(errors => errors.msg);
                respuesta.status(400).json({
                    msg: checkError
                })
                return;
            }
            next();
        }
    ]
}