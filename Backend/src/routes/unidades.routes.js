import {Router} from 'express'
import { unidades } from '../controllers/unidades.controller.js'
import { validationUnidad } from '../validators/unidades.validator.js';

const rutas = Router();

rutas.post("/", validationUnidad(), unidades.postUnidad);
rutas.put("/:id", validationUnidad(), unidades.putUnidad);
rutas.get("/", unidades.getUnidades);
rutas.get("/total", unidades.getTotal);
rutas.get("/:id", unidades.getUnidad);
rutas.get("/equipos/:unit", unidades.getTotalEquipos);

export default rutas