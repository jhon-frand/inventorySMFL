import { Router } from "express";
import { mantenimientos } from "../controllers/mantenimientos.controller.js";
import { validationMantenimiento } from "../validators/mantenimientos.validator.js";

const rutas = Router();

rutas.post("/", validationMantenimiento(), mantenimientos.postMantenimiento);
rutas.put("/:id", validationMantenimiento(), mantenimientos.putMantenimiento);
rutas.get("/", mantenimientos.getMantenimientos);
rutas.get("/total", mantenimientos.getTotal);
rutas.get("/:id", mantenimientos.getMantenimiento);

export default rutas;