import { Router } from "express";
import { tecnicos } from "../controllers/tecnicos.controller.js";
import { validationTecnico } from "../validators/tecnicos.validator.js";

const rutas = Router();

rutas.post("/", validationTecnico(), tecnicos.postTecnico);
rutas.put("/:id", validationTecnico(), tecnicos.putTecnico);
rutas.get("/", tecnicos.getTecnicos);
rutas.get("/:id", tecnicos.getTecnico);

export default rutas;