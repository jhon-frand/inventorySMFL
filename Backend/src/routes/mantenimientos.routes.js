import { Router } from "express";
import { mantenimientos } from "../controllers/mantenimientos.controller.js";
import { validationMantenimiento } from "../validators/mantenimientos.validator.js";
import { validationToken } from "../controllers/validator.controller.js";

const rutas = Router();

// Rutas de creación y actualización
rutas.post("/", validationMantenimiento(), validationToken, mantenimientos.postMantenimiento);
rutas.put("/:id", validationMantenimiento(), validationToken, mantenimientos.putMantenimiento);

// Rutas de obtención de información
rutas.get("/", mantenimientos.getMantenimientos);
rutas.get("/tipo", mantenimientos.getTotalMantenimientoUnidadType);
rutas.get("/typem", mantenimientos.getTypeMantenimiento);
rutas.get("/total", mantenimientos.getTotal);
rutas.get("/total/:unidad", mantenimientos.getTotalMantenimientoUnidad);

// Rutas específicas
rutas.get("/equipo/:equipo", mantenimientos.getMantenimientoEquipo);
rutas.get("/unidad/:unidad", mantenimientos.getMantenimientoUnidad);
rutas.get("/:id", mantenimientos.getMantenimiento);

export default rutas;

