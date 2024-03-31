import { check, validationResult } from "express-validator";

export const validationEquipo = () => {
    return [
        check('serial')
        .isString().withMessage('debe ser texto')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 4}).withMessage('al menos 4 caracteres'),

        check('nombre_equipo')
        .isString().withMessage('debe ser un texto')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 5}).withMessage('al menos 5 caracteres'),   

        check('marca_equipo')
        .isString().withMessage('debe ser texto')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 3}).withMessage('al menos 3 caracteres'),

        check('modelo_equipo')
        .isString().withMessage('debe ser texto')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 3}).withMessage('al menos 3 caracteres'),

        check('fecha_ingreso')
        .isISO8601().withMessage('debe ser una fecha')
        .notEmpty().withMessage('no puede estar vacío'),   

        check('descripcion')
        .isString().withMessage('debe ser texto')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 20}).withMessage('al menos 20 caracteres'),

        check('tipo_equipo')
        .isString().withMessage('debe ser un string')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 5}).withMessage('al menos 5 caracteres'),

        check('estado')
        .isString().withMessage('debe ser un string')
        .notEmpty().withMessage('no puede estar vacío'),

        check('fk_categoria')
        .isNumeric().withMessage('debe ser un número')
        .notEmpty().withMessage('no puede estar vacío'),

        check('fk_ubicacion')
        .isNumeric().withMessage('debe ser un número')
        .notEmpty().withMessage('no puede estar vacío'),

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