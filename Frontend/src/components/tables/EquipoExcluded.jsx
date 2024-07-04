import MUIDataTable from "mui-datatables"
import axios from "axios"
import { useState, useEffect } from "react"
import { endpointEquipo } from "../endpoints/Endpoints"
import moment from "moment"
import { options } from "../styles/Table";

function EquipoExcluded() {

    const [equipos, setEquipos] = useState([])
    const [equiposUnit, setEquiposUnit] = useState([])

    const user = localStorage.getItem("user");
    const unidadUser = localStorage.getItem("unidad");

    const getEquipos = async () => {
        try {
            const respuesta = await axios.get(`${endpointEquipo}/lista/${"excluido"}`).then((response) => {
                const equipment = response.data;
                setEquipos(equipment);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getEquiposUnit = async () => {
      try {
        await axios.get(`${endpointEquipo}/estado/${"excluido"}/unidad/${unidadUser}`).then((response) => {
          const equipment = response.data;
          setEquiposUnit(equipment);
        })
      } catch (error) {
        console.log(error)
      }
    }

    const columnas = [
        {
          name: "id_equipo",
          label: "ID",
          options: {
            display: 'false' // Esta opción oculta la columna en la interfaz
          }
        },
        {
          name: "serial",
          label: "SERIAL"
        },
        {
          name: "nombre_equipo",
          label: "NOMBRE"
        },
        {
          name: "fecha_ingreso",
          label: "FECHA INGRESO",
          options: {
            customBodyRender: (value) => {
              const fecha = moment(value).format('YYYY-MM-DD');
              return fecha;
            },
          }
        },
        {
          name: "estado",
          label: "ESTADO",
          options: {
            display: 'false'
          }
        },
        {
          name: "nombre_categoria",
          label: "CATEGORIA"
        },
        {
          name: "nombre_unidad",
          label: "UNIDAD"
        },
        {
          name: "ambiente",
          label: "AMBIENTE"
        },
        {
          name: "sitio",
          label: "SITIO",
          options: {
            display: 'false' // Esta opción oculta la columna en la interfaz
          }
        },
        {
          name: "tipo_equipo",
          label: "TIPO",
          options: {
            display: 'false'
          }
        },
        {
          name: "marca_equipo",
          label: "MARCA",
          options: {
            display: 'false'
          }
        },
        {
          name: "modelo_equipo",
          label: "MODELO",
          options: {
            display: 'false'
          }
        },
        {
          name: "descripcion",
          label: "DESCRIPCIÓN",
          options: {
            display: 'false'
          }
        }
      ]

    useEffect(() => {
        getEquipos();
        getEquiposUnit();
    }, [])
  return (
    <>
         {
      user && user === "1" ? (
        <MUIDataTable className="table-data"
        title="Equipos excluidos"
        data={equipos}
        columns={columnas}
        options={options}
      />
      ): (
        <MUIDataTable className="table-data"
        title="Equipos excluidos"
        data={equiposUnit}
        columns={columnas}
        options={options}
      />
      )
     }
    </>
  )
}

export default EquipoExcluded