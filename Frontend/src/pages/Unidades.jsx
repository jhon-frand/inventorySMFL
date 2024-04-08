import styled from "styled-components"
import MUIDatatable from "mui-datatables";
import { options } from "../components/styles/Table"
import axios from "axios";
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import { Contenedor } from "../components/styles/StylesPages";


function Unidades() {

  const endpointUnit = "http://localhost:3000/unidades"
  const [unidades, setUnidades] = useState([])

  const getTotalEquipos = async (nombre_unidad) => {
    try {
      const respuesta = await axios.get(`${endpointUnit}/equipos/${nombre_unidad}`)
      return respuesta.data.total_equipos;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  const getUnidades = async () => {
    try {
      const response = await axios.get(endpointUnit);
      const units = response.data;
  
      // Iterar sobre cada unidad y agregar el total de equipos
      for (const unidad of units) {
        const totalEquipos = await getTotalEquipos(unidad.nombre_unidad);
        unidad.total_equipos = totalEquipos;
      }
  
      // Actualizar el estado con las unidades que ahora tienen el total de equipos
      setUnidades(units);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUnidades();

}, [])

  const columnas = [
    {
      name: "id_unidad",
      label: "ID"
    },
    {
      name: "nombre_unidad",
      label: "NOMBRE"
    },
    {
      name: "total_equipos",
      label: "EQUIPOS"
    }
  ]

  return (
  <>
    <Container>
        <Contenedor>
          <div className="contents">
            <MUIDatatable className="table"
            title="Unidades Productivas"
            data={unidades}
            columns={columnas}
            options={options}
            />
          </div>
        </Contenedor>
    </Container>
  </>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-width: 100%;

  .contents{
    width: 40%;
  }

.table{
  padding: 5px;

  th{
   background: #38A800;
   color: white;
   padding: 10px;
  }
}
`;

const Modales = styled.div`
position: absolute;
top: 0;
left: 0;
z-index: 30;

.formulario{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .contents{
    display: flex;
    flex-direction: column;
    background: white;
    padding: 15px;
    border-radius: 5px;
    gap: 10px;

    label{
      font-size: 14px;
      font-weight: 600;
    }

    input{
      padding: 5px;
      width: 280px;
      border: none;
      outline: none;
      border-bottom: 1px solid #38a800;
    }
  }

  button{
    width: 200px;
    height: 40px;
    background: #38a800;
    color: white;
    font-weight: 600;
    border-radius: 5px;
    border: none;
    margin-top: 20px;
  
    &:hover{
      cursor: pointer;
      background: #38a80090;
      color: green;
    }
  }

}
.inputs-data{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #38a80030;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
}
`;
export default Unidades