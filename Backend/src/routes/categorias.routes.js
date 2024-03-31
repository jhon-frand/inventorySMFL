import { Router } from "express";
import { categorias } from "../controllers/categorias.controller.js";
import { validationCategory } from "../validators/categorias.validator.js";

const rutas = Router();

rutas.post("/", validationCategory(), categorias.postCategoria);
rutas.put("/:id", validationCategory(), categorias.putCategoria);
rutas.get("/:id", categorias.getCategoria);
rutas.get("/", categorias.getCategorias);

export default rutas;