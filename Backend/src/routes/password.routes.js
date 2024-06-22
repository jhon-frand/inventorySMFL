import { Router } from "express"
import { contraseña } from "../controllers/password.controller.js"
import { validationPutPassword } from "../validators/usuarios.validator.js";

const rutas = Router();

rutas.post("/recuperar", contraseña.tokenPassword);
rutas.put("/reset", validationPutPassword(), contraseña.resetPassword);

export default rutas;
