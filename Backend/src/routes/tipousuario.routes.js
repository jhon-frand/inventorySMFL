import { Router } from 'express'
import { tipos } from '../controllers/tipousuario.controller.js'

const rutas = Router();

rutas.get("/", tipos.getTipos);


export default rutas;