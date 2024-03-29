import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectionDb } from "./src/database/database.js";
import rutasUnidades from "./src/routes/unidades.routes.js";
import rutasUsuarios from "./src/routes/usuarios.routes.js";
import rutasCategorias from "./src/routes/categorias.routes.js";
import rutasEquipos from "./src/routes/equipos.routes.js";
import rutasUbicaciones from "./src/routes/ubicaciones.routes.js";
import rutasMantenimientos from "./src/routes/mantenimientos.routes.js";
import rutasTecnicos from "./src/routes/tecnicos.routes.js";
import rutasActividades from "./src/routes/actividades.routes.js";
import rutasTipo from "./src/routes/tipousuario.routes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));


app.use("/unidades", rutasUnidades);
app.use("/usuarios", rutasUsuarios);
app.use("/categorias", rutasCategorias);
app.use("/equipos", rutasEquipos);
app.use("/ubicaciones", rutasUbicaciones);
app.use("/mantenimientos", rutasMantenimientos);
app.use("/tecnicos", rutasTecnicos);
app.use("/actividades", rutasActividades);
app.use("/tipousuario", rutasTipo);

app.listen(3000, () => {
    console.log("Server on port 3000");
    connectionDb();
});