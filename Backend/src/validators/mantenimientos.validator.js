import { check, validationResult } from "express-validator";

export const validationMantenimiento = () => {
    return [
        check('tipo_mantenimiento')
        .isString().withMessage('no pueden ser números')
        .notEmpty().withMessage('no puede estar vacío'),

        check('fecha_mantenimiento')
        .isISO8601().withMessage('debe ser un texto')
        .notEmpty().withMessage('no puede estar vacío'),   

        check('fk_equipo')
        .isNumeric().withMessage('debe ser un número')
        .notEmpty().withMessage('no puede estar vacío'),

        check('fk_user_responsable')
        .isNumeric().withMessage('debe ser un número')
        .notEmpty().withMessage('no puede estar vacío'),

        check('descripcion')
        .isString().withMessage('debe ser un string')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 20}).withMessage('al menos 20 caracteres'),

        check('resultado')
        .isString().withMessage('debe ser un string')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 10}).withMessage('al menos 10 caracteres'),

        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const checkError = errors.array().map(error => error.msg);
                res.status(400).json({msg:checkError})
                return;
            }
            next();
        }
    ]
}