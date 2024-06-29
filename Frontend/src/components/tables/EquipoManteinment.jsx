import MUIDataTable from "mui-datatables"
import axios from "axios"
import { useState, useEffect } from "react"
import { endpointEquipo } from "../endpoints/Endpoints"
import moment from "moment"
import { options } from "../styles/Table";
import ButtonEdit from "../organismos/ButtonEdit"
import { HiMiniPencilSquare } from "react-icons/hi2"


function EquipoManteinment() {
  const [equipos, setEquipos] = useState([])

  const getEquipos = async () => {
    try {
      const respuesta = await axios.get(`${endpointEquipo}/lista/${"mantenimiento"}`).then((response) => {
        const equipment = response.data;
        setEquipos(equipment);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const putStatus = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointEquipo}/estado/${id}`)
    } catch (error) {
      console.log(error.response)
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
        display: 'false' // Esta opción oculta la columna en la interfaz
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
      label: "CATEGORIA",
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
        display: 'false'
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
    },
    {
      name: "editar",
      label: "ACTIONS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonEdit
              titulo='Editar'
              icon={<HiMiniPencilSquare />}

            />
          );
        }
      }
    }
  ]

  useEffect(() => {
    getEquipos()
  }, [])

  return (
    <>
      <MUIDataTable
        title="Equipos en mantenimiento"
        data={equipos}
        columns={columnas}
        options={options}
      />
      <div className="menu-edit">
        <h2>Cambiar estado</h2>
        <ul>
          <li>Activo</li>
          <li>Inacivo</li>
        </ul>
      </div>
    </>
  )
}

export default EquipoManteinment