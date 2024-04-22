import {Router} from 'express'
import { equipos } from '../controllers/equipos.controller.js';
import { validationEquipo } from '../validators/equipos.validator.js';
import { validationToken } from '../controllers/validator.controller.js';

const rutas = Router();

rutas.post("/", validationEquipo(), validationToken, equipos.postEquipo);
rutas.put("/:id", validationEquipo(), validationToken, equipos.putEquipo);
rutas.get("/", equipos.getEquipos);
rutas.get("/total", equipos.getTotal);
rutas.get("/:unidad", equipos.getEquiposUnidad);
rutas.get("/total/:unidad", equipos.getTotalEquiposUnidad);
rutas.get("/:id", equipos.getEquipo);
rutas.put("/estado/:id", equipos.putEstadoEquipo);

export default rutas