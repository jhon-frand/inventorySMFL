import { Router } from 'express'
import { usuarios } from '../controllers/usuarios.controller.js'
import { validationUsuario, validationPutUsuario } from '../validators/usuarios.validator.js';
import { validationToken } from '../controllers/validator.controller.js';

const rutas = Router();

rutas.post("/", validationUsuario(), validationToken, usuarios.postUsuario);
rutas.post("/verify/:id", usuarios.verifyPassword); // POST para verificar contraseña

rutas.put("/:id", validationPutUsuario(), validationToken, usuarios.putUsuario); // PUT para actualizar usuario
rutas.put("/password/:id", usuarios.putPassword); // PUT para actualizar contraseña
rutas.put("/estado/:id", usuarios.putEstado); // PUT para actualizar estado de usuario

rutas.get("/total", usuarios.totalUsers); // GET para obtener el total de usuarios
rutas.get("/:id", usuarios.getUsuario); // GET para obtener un usuario por ID
rutas.get("/", usuarios.getUsuarios); // GET para obtener todos los usuarios


export default rutas;