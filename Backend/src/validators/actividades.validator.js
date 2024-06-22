import { check, validationResult } from "express-validator"

export const validationActividad = () => {
    return [
        check('fecha_actividad')
        .isISO8601().withMessage('la fecha de actividad debe ser en formato YYYY-MM-DD')
        .notEmpty().withMessage('la fecha de actividad no puede estar vacía'),
        
        check('descripcion')
        .isString().withMessage('la descripción deben ser texto')
        .notEmpty().withMessage('la descripción no puede estar vacía')
        .isLength({min: 10}).withMessage('Debe tener al menos 10 caracteres'),

        check('fk_mantenimiento')
        .isNumeric().withMessage('la fk_mantenimiento deben ser numérica')
        .notEmpty().withMessage('la fk_mantenimiento no puede estar vacía'),

        check('fk_tecnico')
        .isNumeric().withMessage('la fk_tecnico debe ser numérica')
        .notEmpty().withMessage('la fk_tecnico no puede estar vacía'),

        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const checkError = errors.array().map(error => [
                    error.path,
                    error.msg
                ]);
                res.status(400).json({msg:checkError})
                return;
            }
            next();
        }
    ]
}