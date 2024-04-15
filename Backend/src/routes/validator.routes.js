import { Router } from "express";
import { validationUser } from "../controllers/validator.controller.js";

const rutas = Router();

rutas.post("/", validationUser)

export default rutas;