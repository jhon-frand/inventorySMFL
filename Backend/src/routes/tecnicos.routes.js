import { Router } from "express";
import { tecnicos } from "../controllers/tecnicos.controller.js";
import { validationTecnico } from "../validators/tecnicos.validator.js";
import { validationToken } from "../controllers/validator.controller.js";

const rutas = Router();

rutas.post("/", validationTecnico(), validationToken, tecnicos.postTecnico);
rutas.put("/:id", validationTecnico(), validationToken, tecnicos.putTecnico);
rutas.get("/", tecnicos.getTecnicos);
rutas.get("/:id", tecnicos.getTecnico);

export default rutas;