import {Router} from 'express'
import { equipos } from '../controllers/equipos.controller.js';

const rutas = Router();

rutas.post("/", equipos.postEquipo);
rutas.put("/:id", equipos.putEquipo);
rutas.get("/", equipos.getEquipos);
rutas.get("/total", equipos.getTotal);
rutas.get("/:id", equipos.getEquipo);
rutas.put("/estado/:id", equipos.putEstadoEquipo);

export default rutas