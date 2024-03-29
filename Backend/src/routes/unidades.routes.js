import {Router} from 'express'
import { unidades } from '../controllers/unidades.controller.js'

const rutas = Router();

rutas.post("/", unidades.postUnidad);
rutas.put("/:id", unidades.putUnidad);
rutas.get("/", unidades.getUnidades);
rutas.get("/:id", unidades.getUnidad);

export default rutas