import { check, validationResult } from "express-validator"

export const validationActividad = () => {
    return [
        check('fecha_actividad')
        .isISO8601().withMessage('la fecha de actividad debe ser en formato YYYY-MM-DD')
        .notEmpty().withMessage('la fecha de actividad no puede estar vacía'),
        
        check('descripcion')
        .isString().withMessage('la descripción deben ser texto')
        .notEmpty().withMessage('la descripción no puede estar vacía')
        .isLength({min: 20}).withMessage('la descripción debe tener al menos 20 caracteres'),

        check('fk_mantenimiento')
        .isNumeric().withMessage('la fk_mantenimiento deben ser numérica')
        .notEmpty().withMessage('la fk_mantenimiento no puede estar vacía'),

        check('fk_tecnico')
        .isNumeric().withMessage('la fk_tecnico debe ser numérica')
        .notEmpty().withMessage('la fk_tecnico no puede estar vacía'),

        (peticion, respuesta, next) => {
            const errores = validationResult(peticion);

            if (!errores.isEmpty()) {
                const checkError = errores.array().map(errores => errores.msg)
                respuesta.status(400).json({
                    msg: checkError
                })
                return;
            }
            next()
        }
    ]
}