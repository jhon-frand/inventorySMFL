import { Router } from "express";
import { mantenimientos } from "../controllers/mantenimientos.controller.js";

const rutas = Router();

rutas.post("/", mantenimientos.postMantenimiento);
rutas.put("/:id", mantenimientos.putMantenimiento);
rutas.get("/", mantenimientos.getMantenimientos);
rutas.get("/total", mantenimientos.getTotal);
rutas.get("/:id", mantenimientos.getMantenimiento);

export default rutas;