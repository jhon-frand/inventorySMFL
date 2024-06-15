import styled from "styled-components"
import ContainerContent from "../components/organismos/ContainerContent";
import { PiBoundingBox } from "react-icons/pi"
import { FiUsers } from "react-icons/fi";
import { CgToolbox } from "react-icons/cg";
import { GoTools } from "react-icons/go";
import { useEffect, useState } from "react";
import { 
  getTotalUsers,
  getTotalUnits,
  getTotalEquipment,
  getTotalManteinment,
  getTotalMantenimientoUnit
 } from "../functions/FunctionsDashboard";
import { Contenedor } from "../components/styles/StylesPages";
import MUIDataTable from "mui-datatables";
import { optionsTableUnit } from "../components/styles/Table"
import { columnasDashboard } from "../components/tables/Columnas";
import { endpointUnidad } from "../components/endpoints/Endpoints";
import axios from "axios";
import StackedBarChart from "../components/graphics/Manteinments";
import TypeManteinments from "../components/graphics/Typemanteinment";
import TotalEquipments from "../components/graphics/Equipments";

function Dashboard() {

 const [unidades, setUnidades] = useState([])
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

  //#region tabla unidades
  const getTotalEquiposUnit = async (nombre_unidad) => {
    try {
      const respuesta = await axios.get(`${endpointUnidad}/equipos/${nombre_unidad}`)
      return respuesta.data.total_equipos;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  const getUnidades = async () => {
    try {
      const response = await axios.get(endpointUnidad);
      const units = response.data;
  
      // Iterar sobre cada unidad y agregar el total de equipos
      for (const unidad of units) {
        const totalEquipos = await getTotalEquiposUnit(unidad.nombre_unidad);
        unidad.total_equipos = totalEquipos;
      }
  
      // Actualizar el estado con las unidades que ahora tienen el total de equipos
      setUnidades(units);
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion tabla unidades

  useEffect(() => {
    getUnidades();
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
      titulo="Unidades Productivas"
      icon = {<PiBoundingBox/>}
      to={"/ubicaciones"}
      total={totalUnits}
      />
      <ContainerContent  
      titulo="Encargados"
      icon = {<FiUsers/>}
      to={"/usuarios"}
      total={totalUser}
      />
   </>
    )
   }
      <ContainerContent  
      titulo="Total Equipos"
      icon = {<CgToolbox/>}
      to={"/equipos"}
      total={user && user === "1" ? totalEquipos : totalEquiposUnidad}
      />
      <ContainerContent  
      titulo="Total Mantenimientos"
      icon = {<GoTools/>}
      to={"/mantenimientos"}
      total={user && user === "1" ? totalMantenimientos : totalMantenimientosUnidad}
      />
      
    </div>
    <div className="content-information">
      <div className="content-one">
        <h2>Mantenimientos por Unidad</h2>
        <div className="graphic-bars">
        <StackedBarChart/>
        </div>
      </div>
      <div className="content-two">
        <h2>Total Mantenimientos</h2>
        <div className="graphic-circle">
        <TypeManteinments/>
        </div>
        </div>
    </div>
    <div className="info-units">
    <div className="table-unit">
      <MUIDataTable className="table"
            title="Equipos por Unidad"
            data={unidades}
            columns={columnasDashboard}
            options={optionsTableUnit}
            />
      </div>
      <div className="graphic-equipos">
        <h2>Equipos por Unidad</h2>
      <div>
      <TotalEquipments/>
      </div>
      </div>
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
    padding-bottom: 10px;
  }
  .content-information{
    width: 95%;
    display: flex;
    padding: 20px;
    justify-content: center;
    border-radius: 20px;
    gap: 10px;

    .content-one{
      width: 70%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 20px;

      h2{
        color: #38746c;
      }

      .graphic-bars{
        width: 90%;
        display: flex;
        justify-content: center;
      }
    }

    .content-two{
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      border-radius: 20px;

      h2{
        color: #38746c;
      }

      .graphic-circle{
        padding-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

    }

   
  }
  .info-units{
    width: 95%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .table-unit{
      width: 40%;

      .table{
        padding: 5px;
        border-radius: 10px;

        th{
          background: #38a800;
          color: white;
          padding: 5px;
          
        }

        td{
          text-align: center;
        }
      }
    }

    .graphic-equipos{
      width: 60%;
      height: 100%;
      border-radius: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: white;

      h2{
        color: #38746c;
      }
    }

  }
`;
export default Dashboard