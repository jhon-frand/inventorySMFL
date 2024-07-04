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
import { ContenedorDashboard } from "../components/styles/StylesPages";
import MUIDataTable from "mui-datatables";
import { optionsTableUnit } from "../components/styles/Table"
import { columnasDashboard } from "../components/tables/Columnas";
import { endpointUnidad } from "../components/endpoints/Endpoints";
import axios from "axios";
import StackedBarChart from "../components/graphics/Manteinments";
import TypeManteinments from "../components/graphics/Typemanteinment";
import TotalEquipments from "../components/graphics/Equipments";
import BasicTabs from "../components/tabs/TabTargets";
import StatusEquipments from "../components/graphics/StatusEquipments";
import EquipmentStatus from "../components/graphics/EquipmentStatus";
import TypeManteinmentUnit from "../components/graphics/TypeManteinmentUnit";
import MenuList from "../components/menulist/MenuList";

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
    <Container>
      <ContenedorDashboard>
        <div className="contents">
          {
            user && user === "1" && (
              <>
                <ContainerContent
                  titulo="Unidades Productivas"
                  icon={<PiBoundingBox />}
                  to={"/ubicaciones"}
                  total={totalUnits}
                />
                <ContainerContent
                  titulo="Encargados"
                  icon={<FiUsers />}
                  to={"/usuarios"}
                  total={totalUser}
                />
              </>
            )
          }
          <ContainerContent
            titulo="Total Equipos"
            icon={<CgToolbox />}
            to={"/equipos"}
            total={user && user === "1" ? totalEquipos : totalEquiposUnidad}
          />
          <ContainerContent
            titulo="Total Mantenimientos"
            icon={<GoTools />}
            to={"/mantenimientos"}
            total={user && user === "1" ? totalMantenimientos : totalMantenimientosUnidad}
          />

        </div>
        <div className="targets-graphic">

          {
            user && user === "1" ? (
              <BasicTabs
                text1="mantenimientos"
                text2="equipos">

                <div className="content-information">
                  <div className="content-one">
                    <h2>Mantenimientos por Unidad</h2>
                    <div className="graphic-bars">
                      <StackedBarChart />
                    </div>
                  </div>
                  <div className="content-two">
                    <h2>Total Mantenimientos</h2>
                    <div className="graphic-circle">
                      <TypeManteinments />
                    </div>
                  </div>
                </div>
                <div className="graphic-equipos">
                  <div className="equipos">
                    <h2>Equipos por Unidad</h2>
                    <div>
                      <TotalEquipments />
                    </div>
                  </div>
                  <div className="status">
                    <h2>Equipos por estado</h2>
                    <div>
                      <StatusEquipments />
                    </div>
                  </div>
                </div>
              </BasicTabs>
            ) : (
              <div className="graphic-equipos">
                <div className="equipos">
                  <h2>Equipos por estado</h2>
                  <div className="">
                    <EquipmentStatus />
                  </div>
                </div>
                <div className="status">
                  <h2>Total Mantenimientos</h2>
                  <div className="">
                    <TypeManteinmentUnit />
                  </div>
                </div>
                </div>
            )
          }


        </div>

      </ContenedorDashboard>
    </Container>
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
    width: 90%;
    margin-top: 20px;
  }
  .targets-graphic{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    width: 90%;
    .graphic-equipos{
      width: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;

      .equipos, .status{
        padding: 20px;
        background-color: white;
        display: flex;
        flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      gap: 20px;
      }

      .status{
        width: 400px;
        padding-right: 50px;
      }

      h2{
        color: #153f39;
      }
    }

  }

  .content-information{
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;

    .content-one{
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 20px;
      padding: 20px;

      h2{
        color: #153f39;
      }
    }

    .content-two{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      border-radius: 20px;

      h2{
        color: #153f39;
      }

      .graphic-circle{
        padding-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

    }

   
  }


 
`;
export default Dashboard