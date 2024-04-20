import { Router } from "express";
import { ubicaciones } from "../controllers/ubicaciones.controller.js";
import { validationUbicacion } from "../validators/ubicaciones.validator.js";
import { validationToken } from "../controllers/validator.controller.js";

const rutas = Router();

rutas.post("/", validationUbicacion(), validationToken, ubicaciones.postUbicacion);
rutas.put("/:id", validationUbicacion(), validationToken, ubicaciones.putUbicacion);
rutas.get("/:unidad", ubicaciones.getUbicacionesUnidad);
rutas.get("/:id", ubicaciones.getUbicacion);
rutas.get("/", ubicaciones.getUbicaciones);

export default rutas;