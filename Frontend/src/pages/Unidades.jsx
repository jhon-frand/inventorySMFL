import MUIDatatable from "mui-datatables";
import { options } from "../components/styles/Table"
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Contenedor } from "../components/styles/StylesUnidades";
import { endpointUnidad } from "../components/endpoints/Endpoints";
import { columnasDashboard } from "../components/tables/Columnas";


function Unidades() {

  const [unidades, setUnidades] = useState([])

  const getTotalEquipos = async (nombre_unidad) => {
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

  return (
  <>
    <Container>
        <Contenedor>
          <div className="contents">
            <MUIDatatable className="table"
            title="Unidades Productivas"
            data={unidades}
            columns={columnasDashboard}
            options={options}
            />
          </div>
        </Contenedor>
    </Container>
  </>
  )
}

export default Unidades