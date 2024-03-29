import { Router } from "express";
import { tecnicos } from "../controllers/tecnicos.controller.js";

const rutas = Router();

rutas.post("/", tecnicos.postTecnico);
rutas.put("/:id", tecnicos.putTecnico);
rutas.get("/", tecnicos.getTecnicos);
rutas.get("/:id", tecnicos.getTecnico);

export default rutas;