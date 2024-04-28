import { Router } from "express"
import { contraseña } from "../controllers/password.controller.js"

const rutas = Router();

rutas.post("/recuperar", contraseña.tokenPassword);
rutas.put("/reset", contraseña.resetPassword);

export default rutas;
