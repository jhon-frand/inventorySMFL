import { Router } from "express";
import { categorias } from "../controllers/categorias.controller.js";
import { validationCategory } from "../validators/categorias.validator.js";
import { validationToken } from "../controllers/validator.controller.js";

const rutas = Router();

rutas.post("/", validationCategory(), validationToken, categorias.postCategoria);
rutas.put("/:id", validationCategory(), validationToken, categorias.putCategoria);
rutas.get("/:id", categorias.getCategoria);
rutas.get("/", categorias.getCategorias);

export default rutas;