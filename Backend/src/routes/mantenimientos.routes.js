import { Router } from "express";
import { mantenimientos } from "../controllers/mantenimientos.controller.js";

const rutas = Router();

rutas.post("/", mantenimientos.postMantenimiento);
rutas.put("/:id", mantenimientos.putMantenimiento);
rutas.get("/", mantenimientos.getMantenimientos);
rutas.get("/:id", mantenimientos.getMantenimiento);

export default rutas;