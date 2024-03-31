import { Router } from 'express'
import { usuarios } from '../controllers/usuarios.controller.js'
import { validationUsuario, validationPutUsuario } from '../validators/usuarios.validator.js';

const rutas = Router();

rutas.post("/", validationUsuario(), usuarios.postUsuario);
rutas.put("/:id", validationPutUsuario(), usuarios.putUsuario);
rutas.put("/estado/:id", usuarios.putEstado);
rutas.get("/total", usuarios.totalUsers);
rutas.get("/:id", usuarios.getUsuario);
rutas.get("/", usuarios.getUsuarios);

export default rutas;