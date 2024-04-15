import { check, validationResult } from "express-validator";

export const validationCategory = () => {
    return [
        check('nombre_categoria')
        .isString().withMessage('la categoría debe ser un texto')
        .notEmpty().withMessage('la categoría no puede estar vacía')
        .isLength({min: 5}).withMessage('Debe tener al menos cinco caracteres'),

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