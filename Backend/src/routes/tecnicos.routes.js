import { Router } from "express";
import { tecnicos } from "../controllers/tecnicos.controller.js";
import { validationTecnico, validationPutTecnico } from "../validators/tecnicos.validator.js";
import { validationToken } from "../controllers/validator.controller.js";

const rutas = Router();

rutas.post("/", validationTecnico(), validationToken, tecnicos.postTecnico);
rutas.put("/:id", validationPutTecnico(), validationToken, tecnicos.putTecnico);
rutas.get("/", tecnicos.getTecnicos);
rutas.get("/:id", tecnicos.getTecnico);

export default rutas;