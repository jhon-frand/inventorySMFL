import {Router} from 'express'
import { unidades } from '../controllers/unidades.controller.js'
import { validationUnidad } from '../validators/unidades.validator.js';
import { validationToken } from '../controllers/validator.controller.js';

const rutas = Router();

rutas.post("/", validationUnidad(), validationToken, unidades.postUnidad);
rutas.put("/:id", validationUnidad(), validationToken, unidades.putUnidad);
rutas.get("/", unidades.getUnidades);
rutas.get("/total", unidades.getTotal);
rutas.get("/:id", unidades.getUnidad);
rutas.get("/equipos/:unit", unidades.getTotalEquipos);

export default rutas