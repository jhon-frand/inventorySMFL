import MUIDataTable from "mui-datatables"
import axios from "axios"
import { useState, useEffect } from "react"
import { endpointEquipo } from "../endpoints/Endpoints"
import moment from "moment"
import { options } from "../styles/Table";
import ButtonEdit from "../organismos/ButtonEdit"
import Modal from "../modals/Modal"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { AlertSucces } from "../alerts/Alerts"
import ModalButton from "../buttons/ModalButton"
import styled from "styled-components"
import { MdPublishedWithChanges } from "react-icons/md";


function EquipoManteinment() {

  const [equipos, setEquipos] = useState([])
  const [equiposUnit, setEquiposUnit] = useState([])
  const [modal, setModal] = useState(false)
  const [idEquipo, setIdEquipo] = useState("")

  const user = localStorage.getItem("user");
  const unidadUser = localStorage.getItem("unidad");

  const [valor, setValor] = useState({
    estado: ""
  })

  const valorInput = (event) => {
    setValor({
      ...valor,
      [event.target.name] : event.target.value
    })
  }

  const clearForm = () => {
    setValor({
      estado: ""
    })
    setModal(false)
    setIdEquipo(null)
  }

  const getData = (datos) => {
    try {
      const valueId = datos[0];
      setIdEquipo(valueId);
      setModal(true);
    } catch (error) {
      console.log(error)
    }
  }

  const getEquiposUnit = async () => {
    try {
      await axios.get(`${endpointEquipo}/estado/${"mantenimiento"}/unidad/${unidadUser}`).then((response) => {
        const equipment = response.data;
        setEquiposUnit(equipment);
      })
    } catch (error) {
      console.log(error)
    }
  }

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
      const respuesta = await axios.put(`${endpointEquipo}/estado/${idEquipo}`, valor)
      if (respuesta.status === 200) {
        getEquipos();
        clearForm();
        AlertSucces("Estado actualizado")
      }
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
              funcion1={() => getData(tableMeta.rowData)}
              titulo='Cambiar estado'
              icon={<MdPublishedWithChanges />}

            />
          );
        }
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
        title="Equipos en mantenimiento"
        data={equipos}
        columns={columnas}
        options={options}
      />
      ): (
        <MUIDataTable className="table-data"
        title="Equipos en mantenimiento"
        data={equiposUnit}
        columns={columnas}
        options={options}
      />
      )
     }
      <Modal
        titulo="CAMBIAR ESTADO DE EQUIPO"
        estado={modal}
        cambiarEstado={clearForm}>
        <FormStatus onSubmit={putStatus}>
          <FormControl>
          <InputLabel>Estado</InputLabel>
          <Select label="Estado" value={valor.estado} onChange={valorInput} name="estado" required>
            <MenuItem value="activo">Activar</MenuItem>
            <MenuItem value="inactivo">Desactivar</MenuItem>
          </Select>
          </FormControl>
          <ModalButton text="CAMBIAR ESTADO"/>
        </FormStatus>
      </Modal>
    </>
  )
}

const FormStatus = styled.form`
 display: flex;
 flex-direction: column;
 gap: 10px;
`;

export default EquipoManteinment