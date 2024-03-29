import styled from "styled-components"
import NavBar from "../components/organismos/NavBar";
import HeaderPage from "../components/organismos/HeaderPage";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useEffect, useState } from "react";
import { options } from "../styles/Styles";
import Modal from "../components/modals/Modal";

function Equipos() {

  const endpointEquipo = "http://localhost:3000/equipos"
  const endpointCategory = "http://localhost:3000/categorias"
  const endpointUbication = "http://localhost:3000/ubicaciones"

  const [equipos, setEquipos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [ubicaciones, setUbicaciones] = useState([])
  const [modal, setModal] = useState(false)

  const getEquipos = async () => {
    try {
        await axios.get(endpointEquipo).then((response) =>{
        const equipment = response.data;
        setEquipos(equipment);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getCategorias = async () => {
    try {
      await axios.get(endpointCategory).then((response) => {
        const categories = response.data;
        setCategorias(categories);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getUbicaciones = async () => {
    try {
      await axios.get(endpointUbication).then((response) => {
        const ubication = response.data;
        setUbicaciones(ubication);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const [valores, setValores] = useState({
    serial: "",
    nombre_equipo: "",
    marca_equipo: "",
    modelo_equipo: "",
    fecha_ingreso: "",
    descripcion: "",
    tipo_equipo: "",
    estado: "",
    fk_categoria: "",
    fk_ubicacion: ""
  })
  const valorInput = (event) => {
    setValores({
      ...valores,
       [event.target.name] : event.target.value
    })
  }
  const postEquipo = async (event) => {
    event.preventDefault();
  try {
    const respuesta = await axios.post(endpointEquipo, valores)
    if (respuesta === 200) {
      alert (respuesta.data.message);
    }
    setModal(false);
    getEquipos();
  } catch (error) {
    console.log(error);
  }
  }

  const columnas = [
    {
      name: "id_equipo",
      label: "ID"
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
      label: "FECHA INGRESO"
    },
    {
      name: "estado",
      label: "ESTADO"
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
      label: "SITIO"
    },
    {
      name: "tipo_equipo",
      label: "TIPO"
    },
    {
      name: "marca_equipo",
      label: "MARCA"
    },
    {
      name: "modelo_equipo",
      label: "MODELO"
    },
    {
      name: "descripcion",
      label: "DESCRIPCIÓN"
    },
  ]


  useEffect(() => {
    getEquipos();
    getCategorias();
    getUbicaciones();
  },[])

  return (
    <Container>
      <NavBar/>
      <div className="contenedor">
        <HeaderPage titulo="EQUIPOS" textButton="REGISTRAR EQUIPO" funcion={() => setModal(true)}/>
        <Modales>
          <Modal 
          titulo="REGISTRAR EQUIPO"
          estado={modal}
          cambiarEstado={setModal}
          >
             <form className="formulario" onSubmit={postEquipo}>
            <div className="inputs-data">
              <div className="filas">
              <div className="contents">
                <label>SERIAL: </label>
              <input name="serial" onChange={valorInput} value={valores.serial} type="number" placeholder="Serial" required/>
              </div>
              <div className="contents">
              <label>Nombre: </label>
              <input name="nombre_equipo" onChange={valorInput} value={valores.nombre_equipo} type="text" placeholder="Nombre equipo" required/>
              </div>
              <div className="contents">
              <label>Marca: </label>
              <input name="marca_equipo" onChange={valorInput} value={valores.marca_equipo} type="text" placeholder="Marca del equipo" required/>
              </div>
              <div className="contents">
              <label>Modelo: </label>
              <input name="modelo_equipo" onChange={valorInput} value={valores.modelo_equipo} type="text" placeholder="Modelo del equipo" required/>
              </div>
              </div>
              <div className="filas">
              <div className="contents">
              <label>Fecha de Ingreso: </label>
              <input name="fecha_ingreso" onChange={valorInput} value={valores.fecha_ingreso} type="date" required/>
              </div>
              <div className="contents">
            <label>Tipo de Equipo: </label>
            <input name="tipo_equipo" onChange={valorInput} value={valores.tipo_equipo} type="text" placeholder="tipo de equipo" required/>
              </div>
              <div className="contents">
             <label>Categoría: </label>
             <select name="fk_categoria" onChange={valorInput} value={valores.fk_categoria}>
                <option value="">Seleccione una categoría</option>
            {
              categorias.map((categorias) => (
                <option key={categorias.id_categoria} value={categorias.id_categoria}>{categorias.nombre_categoria}</option>
              ))
            }
              </select>
                </div>
           <div className="contents">
           <label>Estado: </label>
           <select name="estado" onChange={valorInput} value={valores.estado}>
                <option value="">Seleccione un estado</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="excluido">Excluido</option>
              </select>
                </div>
              </div>
            <div className="filas">
             <div className="contents">
             <label>Ubicación: </label>
             <select name="fk_ubicacion" onChange={valorInput} value={valores.fk_ubicacion}>
                <option value="">Seleccione una ubicación</option>
                {
                  ubicaciones.map((ubicaciones) => (
                    <option key={ubicaciones.id_ubicacion} value={ubicaciones.id_ubicacion}>{ubicaciones.nombre_unidad} - {ubicaciones.ambiente} - {ubicaciones.sitio}</option>
                  ))
                }
              </select>
                </div>
              <div className="contents">
              <label>Descripción: </label>
              <textarea name="descripcion" maxLength={250} onChange={valorInput} value={valores.descripcion} type="text" placeholder="Agregue una descripción" required/>
              </div>
            </div>
            </div>
            <button>REGISTRAR</button>
          </form>
          </Modal>
        </Modales>
        <div className="table-mui">
          <MUIDataTable className="table"
          data={equipos}
          columns={columnas}
          options={options}
          />

        </div>
      </div>
    </Container>
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
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.table-mui{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .table{
     width: 90%;
     padding: 5px;

     th{
      background: #38A800;
      color: white;
      padding: 10px;
     }
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

    .inputs-data{
      display: grid;
      grid-template-columns: 200px 230px 230px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      background: #38a80030;
      border-radius: 20px;
      padding: 10px;

      .filas{
        display: flex;
        flex-direction: column;
        gap: 10px;

        .contents{
          display: flex;
          flex-direction: column;
          background: white;
          padding: 5px;
          border-radius: 5px;
          gap: 10px;

          label{
            font-size: 14px;
            font-weight: 600;
          }
        }
  
      }

      input{
        padding: 5px;
        width: 180px;
        border: none;
        outline: none;
        border-bottom: 1px solid #38a800;
      }
      select{
        padding: 4px;
        width: 210px;
        border: none;
        outline: none;
      }
      textarea{
        width: 220px;
        height: 170px;
        border: none;
        outline: none;
        resize: none;
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
`;
export default Equipos