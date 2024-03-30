import NavBar from "../components/organismos/NavBar"
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
  getTotalManteinment } from "../functions/FunctionsDashboard";

function Dashboard() {

 const [totalUser, setTotalUsers] = useState(0)
 const [totalUnits, setTotalUnits] = useState(0)
 const [totalEquipos, setTotalEquipos] = useState(0)
 const [totalMantenimientos, setTotalMantenimientos] = useState(0)

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

  const getTotalMantenimientos = async () => {
    try {
      const result = await getTotalManteinment();
      setTotalMantenimientos(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTotalUsuarios();
    getTotalUnidades();
    getTotalEquipos();
    getTotalMantenimientos();
  }, [])

  return (
    <>
    <Container>
      <NavBar/>
      <div className="contenedor">
    <div className="contents">
    <ContainerContent  
      titulo="UNIDADES PRODUCTIVAS"
      icon = {<PiBoundingBox/>}
      to={"/unidades"}
      total={totalUnits}
      />
      <ContainerContent  
      titulo="EQUIPOS TOTALES"
      icon = {<CgToolbox/>}
      to={"/equipos"}
      total={totalEquipos}
      />
      <ContainerContent  
      titulo="MANTENIMIENTOS"
      icon = {<GoTools/>}
      to={"/mantenimientos"}
      total={totalMantenimientos}
      />
      <ContainerContent  
      titulo="ENCARGADOS"
      icon = {<FiUsers/>}
      to={"/usuarios"}
      total={totalUser}
      />
    </div>
    <div className="content-two">

    </div>
      </div>
    </Container>
    </>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-width: 100%;

.contenedor{
  background: #38A80020;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 20px;
  gap: 10px;
  display: grid; 
  grid-template-columns: 280px auto;

  .contents{
    display: flex;
    flex-direction: column;
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
}
`;
export default Dashboard