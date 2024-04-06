import { check, validationResult } from "express-validator"


export const validationUnidad = () => {
    return[
        check('nombre_unidad')
        .notEmpty().withMessage('El nombre está vacío')
        .isString().withMessage('El nombre debe ser texto')
        .isLength({min: 3}).withMessage('El nombre debe tener al menos tres caracteres'),

        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const checkError = errors.array().map(error => [
                    error.path,
                    error.msg
    ]);;
                res.status(400).json({msg:checkError})
                return;
            }
            next();
        }
    ]
}

