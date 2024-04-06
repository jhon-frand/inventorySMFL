import { check, validationResult } from "express-validator";

export const validationUbicacion = () => {
    return [
        check('fk_unidad_productiva')
        .isNumeric().withMessage('la unidad no puede ser un texto')
        .notEmpty().withMessage('la unidad no puede estar vacía'),

        check('ambiente')
        .isString().withMessage('el ambiente debe ser un texto')
        .notEmpty().withMessage('el ambiente no puede estar vacío')
        .isLength({min: 2}).withMessage('el ambiente debe tener al menos dos caracteres'),   

        check('sitio')
        .isString().withMessage('el sitio debe ser un string')
        .notEmpty().withMessage('el sitio no puede estar vacío')
        .isLength({min: 3}).withMessage('el sitio debe tener al menos tres caracteres'),

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