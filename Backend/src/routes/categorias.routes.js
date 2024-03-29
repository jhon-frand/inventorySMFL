import { Router } from "express";
import { categorias } from "../controllers/categorias.controller.js";

const rutas = Router();

rutas.post("/", categorias.postCategoria);
rutas.put("/:id", categorias.putCategoria);
rutas.get("/:id", categorias.getCategoria);
rutas.get("/", categorias.getCategorias);

export default rutas;