import styled from "styled-components"
import ContainerContent from "../components/organismos/ContainerContent";
import { PiBoundingBox } from "react-icons/pi"
import { FiUsers } from "react-icons/fi";
import { CgToolbox } from "react-icons/cg";
import { GoTools } from "react-icons/go";
import axios from "axios";
import { useEffect, useState } from "react";
import { 
  getTotalUsers,
  getTotalUnits,
  getTotalEquipment,
  getTotalManteinment,
  getTotalEquiposUnit,
  getTotalMantenimientoUnit
 } from "../functions/FunctionsDashboard";
import { Contenedor } from "../components/styles/StylesPages";

function Dashboard() {

 const [totalUser, setTotalUsers] = useState(0)
 const [totalUnits, setTotalUnits] = useState(0)
 const [totalEquipos, setTotalEquipos] = useState(0)
 const [totalMantenimientos, setTotalMantenimientos] = useState(0)
 const [totalEquiposUnidad, setTotalEquiposUnidad] = useState(0)
 const [totalMantenimientosUnidad, setTotalMantenimientosUnidad] = useState(0)

 const user = localStorage.getItem("user");
 const unidad = localStorage.getItem("unidad");

  const getTotalUsuarios = async () => {
    try {
     const result = await getTotalUsers();
     setTotalUsers(result);
    } catch (error) {
      console.log(error);
    }
  }

  const getTotalUnidades = async () => {
    try {
      const result = await getTotalUnits();
      setTotalUnits(result);
    } catch (error) {
      console.log(error);
    }
  }

  const getTotalEquipos = async () => {
    try {
      const result = await getTotalEquipment();
      setTotalEquipos(result);
    } catch (error) {
      console.log(error);
    }
  } 

  const getTotalEquiposUnidad = async () => {
    try {
      const result = await getTotalEquiposUnit(unidad);
      setTotalEquiposUnidad(result);
    } catch (error) {
      console.log(error);
    }
  }

  const getTotalMantenimientos = async () => {
    try {
      const result = await getTotalManteinment();
      setTotalMantenimientos(result);
    } catch (error) {
      console.log(error);
    }
  }

  const getTotalMantenimientosUnidad = async () => {
    try {
      const result = await getTotalMantenimientoUnit(unidad);
      setTotalMantenimientosUnidad(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTotalUsuarios();
    getTotalUnidades();
    getTotalEquipos();
    getTotalEquiposUnidad();
    getTotalMantenimientos();
    getTotalMantenimientosUnidad();
  }, [])

  return (
    <>
    <Container>
      <Contenedor>
    <div className="contents">
   {
    user && user === "1" && (
      <>
   <ContainerContent  
      titulo="UNIDADES PRODUCTIVAS"
      icon = {<PiBoundingBox/>}
      to={"/unidades"}
      total={totalUnits}
      />
      <ContainerContent  
      titulo="ENCARGADOS"
      icon = {<FiUsers/>}
      to={"/usuarios"}
      total={totalUser}
      />
   </>
    )
   }
      <ContainerContent  
      titulo="EQUIPOS TOTALES"
      icon = {<CgToolbox/>}
      to={"/equipos"}
      total={user && user === "1" ? totalEquipos : totalEquiposUnidad}
      />
      <ContainerContent  
      titulo="MANTENIMIENTOS"
      icon = {<GoTools/>}
      to={"/mantenimientos"}
      total={user && user === "1" ? totalMantenimientos : totalMantenimientosUnidad}
      />
      
    </div>
    <div className="content-two">

    </div>
      </Contenedor>
    </Container>
    </>
  )
}

const Container = styled.div`
display: flex;
min-width: 100%;

  .contents{
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }
  .content-two{
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    background: #90b8b0;
    border-radius: 20px;
  }
`;
export default Dashboard