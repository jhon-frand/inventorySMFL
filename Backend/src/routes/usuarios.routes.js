import { Router } from 'express'
import { usuarios } from '../controllers/usuarios.controller.js'
import { validationUsuario, validationPutUsuario } from '../validators/usuarios.validator.js';
import { validationToken } from '../controllers/validator.controller.js';

const rutas = Router();

rutas.post("/", validationUsuario(), validationToken, usuarios.postUsuario);
rutas.put("/:id", validationPutUsuario(), validationToken, usuarios.putUsuario);
rutas.put("/estado/:id", usuarios.putEstado);
rutas.get("/total", usuarios.totalUsers);
rutas.get("/:id", usuarios.getUsuario);
rutas.get("/", usuarios.getUsuarios);

export default rutas;