import { Router } from "express";
import { actividades } from "../controllers/actividades.controller.js";

const rutas = Router();

rutas.post("/", actividades.postActividad);
rutas.put("/:id", actividades.putActividad);
rutas.get("/", actividades.getActividades);
rutas.get("/:id", actividades.getActividad);

export default rutas;