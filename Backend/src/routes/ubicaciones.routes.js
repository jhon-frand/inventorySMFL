import { Router } from "express";
import { ubicaciones } from "../controllers/ubicaciones.controller.js";

const rutas = Router();

rutas.post("/", ubicaciones.postUbicacion);
rutas.put("/:id", ubicaciones.putUbicacion);
rutas.get("/:id", ubicaciones.getUbicacion);
rutas.get("/", ubicaciones.getUbicaciones);

export default rutas;