import { check, validationResult } from "express-validator";

export const validationEquipo = () => {
    return [
        check('serial')
        .isString().withMessage('el serial debe ser texto')
        .notEmpty().withMessage('el serial no puede estar vacío')
        .isLength({min: 4}).withMessage('Debe tener al menos 4 caracteres'),

        check('nombre_equipo')
        .isString().withMessage('el nombre debe ser un texto')
        .notEmpty().withMessage('el nombre no puede estar vacío')
        .isLength({min: 5}).withMessage('Debe tener al menos 3 caracteres'),   

        check('marca_equipo')
        .isString().withMessage('la marca debe ser texto')
        .notEmpty().withMessage('la marca no puede estar vacía')
        .isLength({min: 3}).withMessage('Debe tener al menos 2 caracteres'),

        check('modelo_equipo')
        .isString().withMessage('el modelo debe ser texto')
        .notEmpty().withMessage('el modelo no puede estar vacío')
        .isLength({min: 3}).withMessage('Debe tener al menos 3 caracteres'),

        check('fecha_ingreso')
        .isISO8601().withMessage('la fecha debe ser en formato YYYY-MM-DD')
        .notEmpty().withMessage('la fecha no puede estar vacía'),   

        check('descripcion')
        .isString().withMessage('la decripción debe ser texto')
        .notEmpty().withMessage('la descripción no puede estar vacía')
        .isLength({min: 10}).withMessage('Debe tener al menos 10 caracteres'),

        check('tipo_equipo')
        .isString().withMessage('el tipo debe ser un texto')
        .notEmpty().withMessage('el tipo no puede estar vacío')
        .isLength({min: 3}).withMessage('Debe tener al menos 3 caracteres'),

        check('estado')
        .isString().withMessage('el estado debe ser un texto')
        .notEmpty().withMessage('el estado no puede estar vacío'),

        check('fk_categoria')
        .isNumeric().withMessage('la categoría debe ser un número')
        .notEmpty().withMessage('la categoría no puede estar vacía'),

        check('fk_ubicacion')
        .isNumeric().withMessage('la ubicación debe ser un número')
        .notEmpty().withMessage('la ubicación no puede estar vacía'),

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