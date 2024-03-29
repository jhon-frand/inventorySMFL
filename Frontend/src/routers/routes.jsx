import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Equipos from "../pages/Equipos"
import Mantenimientos from "../pages/Mantenimientos"
import Actividades from "../pages/Actividades"
import Ubicaciones from "../pages/Ubicaciones"
import Usuarios from "../pages/Usuarios"
import Unidades from "../pages/Unidades"

function MyRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/equipos" element={<Equipos/>} />
        <Route path="/mantenimientos" element={<Mantenimientos/>} />
        <Route path="/actividades" element={<Actividades/>} />
        <Route path="/ubicaciones" element={<Ubicaciones/>} />
        <Route path="/usuarios" element={<Usuarios/>} />
        <Route path="/unidades" element={<Unidades/>} />
    </Routes>
  )
}

export default MyRoutes
