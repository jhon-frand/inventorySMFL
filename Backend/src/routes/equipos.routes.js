import {Router} from 'express'
import { equipos } from '../controllers/equipos.controller.js';
import { validationEquipo } from '../validators/equipos.validator.js';
import { validationToken } from '../controllers/validator.controller.js';

const rutas = Router();

// Rutas POST y PUT
rutas.post("/", validationEquipo(), validationToken, equipos.postEquipo);
rutas.put("/:id", validationEquipo(), validationToken, equipos.putEquipo);
rutas.put("/estado/:id", equipos.putEstado);

// Rutas GET específicas
rutas.get("/total", equipos.getTotal);
rutas.get("/estados", equipos.getEquiposEstado);
rutas.get("/total/:unidad", equipos.getTotalEquiposUnidad);
rutas.get("/:id", equipos.getEquipo);

// Rutas GET con parámetros generales y sin parámetros
rutas.get("/lista/:estado", equipos.getEquiposStatus);
rutas.get("/:unidad", equipos.getEquiposUnidad);
rutas.get("/", equipos.getEquipos);

export default rutas