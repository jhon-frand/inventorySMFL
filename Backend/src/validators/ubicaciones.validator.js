import { check, validationResult } from "express-validator";

export const validationUbicacion = () => {
    return [
        check('fk_unidad_productiva')
        .isNumeric().withMessage('no puede ser un texto')
        .notEmpty().withMessage('no puede estar vacío'),

        check('ambiente')
        .isString().withMessage('debe ser un texto')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 3}).withMessage('al menos tres caracteres'),   

        check('sitio')
        .isString().withMessage('debe ser un string')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 3}).withMessage('al menos tres caracteres'),

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