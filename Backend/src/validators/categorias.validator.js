import { check, validationResult } from "express-validator";

export const validationCategory = () => {
    return [
        check('nombre_categoria')
        .isString().withMessage('debe ser un texto')
        .notEmpty().withMessage('no puede estar vacío')
        .isLength({min: 5}).withMessage('al menos cinco caracteres'),

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