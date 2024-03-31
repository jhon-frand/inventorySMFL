import { Router } from "express";
import { actividades } from "../controllers/actividades.controller.js";
import { validationActividad } from "../validators/actividades.validator.js";

const rutas = Router();

rutas.post("/", validationActividad(), actividades.postActividad);
rutas.put("/:id", validationActividad(), actividades.putActividad);
rutas.get("/", actividades.getActividades);
rutas.get("/:id", actividades.getActividad);

export default rutas;