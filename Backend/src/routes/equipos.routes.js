import {Router} from 'express'
import { equipos } from '../controllers/equipos.controller.js';
import { validationEquipo } from '../validators/equipos.validator.js';

const rutas = Router();

rutas.post("/", validationEquipo(), equipos.postEquipo);
rutas.put("/:id", validationEquipo(), equipos.putEquipo);
rutas.get("/", equipos.getEquipos);
rutas.get("/total", equipos.getTotal);
rutas.get("/:id", equipos.getEquipo);
rutas.put("/estado/:id", equipos.putEstadoEquipo);

export default rutas