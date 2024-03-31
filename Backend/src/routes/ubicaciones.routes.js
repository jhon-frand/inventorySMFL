import { Router } from "express";
import { ubicaciones } from "../controllers/ubicaciones.controller.js";
import { validationUbicacion } from "../validators/ubicaciones.validator.js";

const rutas = Router();

rutas.post("/", validationUbicacion(), ubicaciones.postUbicacion);
rutas.put("/:id", validationUbicacion(), ubicaciones.putUbicacion);
rutas.get("/:id", ubicaciones.getUbicacion);
rutas.get("/", ubicaciones.getUbicaciones);

export default rutas;