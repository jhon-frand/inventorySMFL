import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Equipos from "../pages/Equipos"
import Mantenimientos from "../pages/Mantenimientos"
import Ubicaciones from "../pages/Ubicaciones"
import Usuarios from "../pages/Usuarios"
import Unidades from "../pages/Unidades"

function MyRoutes() {

  const rol = localStorage.getItem("user");

  return (
    <>
      {
        rol && rol === "1" ? (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/mantenimientos" element={<Mantenimientos />} />
            <Route path="/ubicaciones" element={<Ubicaciones />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/unidades" element={<Unidades />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/mantenimientos" element={<Mantenimientos />} />
            <Route path="/ubicaciones" element={<Ubicaciones />} />
          </Routes>
        )
      }
    </>
  )
}

export default MyRoutes
