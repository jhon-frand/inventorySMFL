import { Router } from "express";
import { actividades } from "../controllers/actividades.controller.js";
import { validationActividad } from "../validators/actividades.validator.js";
import { validationToken } from "../controllers/validator.controller.js";

const rutas = Router();

rutas.post("/", validationActividad(), validationToken, actividades.postActividad);
rutas.put("/:id", validationActividad(), validationToken, actividades.putActividad);
rutas.get("/", actividades.getActividades);
rutas.get("/:unidad", actividades.getActividadesUnit);
rutas.get("/:id", actividades.getActividad);

export default rutas;