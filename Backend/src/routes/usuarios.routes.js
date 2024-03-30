import { Router } from 'express'
import { usuarios } from '../controllers/usuarios.controller.js'

const rutas = Router();

rutas.post("/", usuarios.postUsuario);
rutas.put("/:id", usuarios.putUsuario);
rutas.put("/estado/:id", usuarios.putEstado);
rutas.get("/total", usuarios.totalUsers);
rutas.get("/:id", usuarios.getUsuario);
rutas.get("/", usuarios.getUsuarios);

export default rutas;