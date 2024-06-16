import { check, validationResult } from "express-validator";

export const validationMantenimiento = () => {
    return [
        check('tipo_mantenimiento')
        .isString().withMessage('tipo de mantenimiento no puede ser número')
        .notEmpty().withMessage('tipo de mantenimiento no puede estar vacío'),

        check('fecha_mantenimiento')
        .isISO8601().withMessage('fecha mantenimiento debe ser en formato YYYY-MM-DD')
        .notEmpty().withMessage('fecha mantenimiento no puede estar vacío'),   

        check('fk_equipo')
        .isNumeric().withMessage('fk_equipo debe ser un número')
        .notEmpty().withMessage('fk_equipo no puede estar vacío'),

        check('fk_user_responsable')
        .isNumeric().withMessage('user responsable debe ser un número')
        .notEmpty().withMessage('user responsable no puede estar vacío'),

        check('descripcion')
        .isString().withMessage('descripción debe ser un string')
        .notEmpty().withMessage('descripción no puede estar vacío')
        .isLength({min: 10}).withMessage('Debe tener al menos 10 caracteres'),


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