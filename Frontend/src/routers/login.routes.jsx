import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login"

function loginRoute() {
  return (
    <Routes>
        <Route path="/" element={<Login/>} />
    </Routes>
  )
}

export default loginRoute