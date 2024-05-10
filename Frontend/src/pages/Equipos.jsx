import styled from "styled-components"
import HeaderPageTwo from "../components/organismos/HeaderPageTwo";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useEffect, useState } from "react";
import { options, optionsMedium } from "../components/styles/Table";
import Modal from "../components/modals/Modal";
import ButtonEdit from "../components/organismos/ButtonEdit";
import moment from "moment"
import { CgToolbox } from "react-icons/cg";
import MediumContainer from "../components/organismos/MediumContainer"
import { Contenedor } from "../components/styles/StylesPages";
import { AlertSucces, AlertError} from "../components/alerts/Alerts";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { TextField } from "@mui/material";

function Equipos() {

  //#region funciones
  const endpointEquipo = "http://localhost:3000/equipos"
  const endpointCategory = "http://localhost:3000/categorias"
  const endpointUbication = "http://localhost:3000/ubicaciones"

  const [equipos, setEquipos] = useState([])
  const [equiposUnidad, setEquiposUnidad] = useState([])
  const [categorias, setCategorias] = useState([])
  const [ubicaciones, setUbicaciones] = useState([])
  const [ubicacionesUnidad, setUbicacionesUnidad] = useState([])
  const [modal, setModal] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalCategory, setModalCategory] = useState(false)
  const [modalCategoryUpdate, setModalCategoryUpdate] = useState(false)
  const [selectId, setSelectId] = useState(null)
  const [selectIdCategory, setSelectIdCategory] = useState(null)
  const [errores, setErrores] = useState("")

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const unidadUser = localStorage.getItem("unidad");

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
  const getEquiposUnidad = async () => {
    try {
        await axios.get(`${endpointEquipo}/${unidadUser}`).then((response) =>{
        const equipment = response.data;
        setEquiposUnidad(equipment);
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
  const getUbicacionesUnidad = async () => {
    try {
      await axios.get(`${endpointUbication}/${unidadUser}`).then((response) => {
        const ubication = response.data;
        setUbicacionesUnidad(ubication);
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
  const clearFormEquipos = () => {
    setValores({
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
    setErrores("")
    setSelectId(null)
    setModalUpdate(false)
    setModal(false)
  }
  const [valoresCategory, setValoresCategory] = useState({
    nombre_categoria: ""
  })
  const clearFormCategory = () => {
    setValoresCategory({
      nombre_categoria: ""
    })
    setErrores("")
    setSelectIdCategory(null)
    setModalCategoryUpdate(false)
    setModalCategory(false)
  }
  const getDataCategory = (datos) => {
    setValoresCategory({
      nombre_categoria: datos[1]
    })
    setSelectIdCategory(datos[0])
    setModalCategoryUpdate(true)
  }
  
  const getData = (datos) => {

    const categoriaEquipo = categorias.find(category => category.nombre_categoria == datos[5]);
    const categoriaEquipoId = categoriaEquipo ? categoriaEquipo.id_categoria: "";

    const fecha = moment(datos[3]).format('YYYY-MM-DD');
      //función para obtener el id de ubicación para que aparezca en el formulario de edición
  const obtenerIdUbicacion = (nombreUnidad, ambiente, sitio) => {
    const ubicacionEncontrada = ubicaciones.find(ubicacion => ubicacion.nombre_unidad === nombreUnidad && ubicacion.ambiente === ambiente && ubicacion.sitio === sitio);
    return ubicacionEncontrada ? ubicacionEncontrada.id_ubicacion : "";
  };

     // Obtener el ID de la ubicación
  const ubicacion = obtenerIdUbicacion(datos[6], datos[7], datos[8]);
    setValores({
      serial: datos[1],
      nombre_equipo: datos[2],
      fecha_ingreso: fecha,
      estado: datos[4],
      fk_categoria: categoriaEquipoId,
      fk_ubicacion: ubicacion,
      tipo_equipo: datos[9],
      marca_equipo: datos[10],
      modelo_equipo: datos[11],
      descripcion: datos[12]
    })
    setSelectId(datos[0])
    setModalUpdate(true)
  }
  const editValorInput = (event) => {
    setValores(prevState => ({
      ...prevState,
      [event.target.name] : event.target.value
    }))
  }
  const editValorInputCategory = (event) => {
    setValoresCategory(prevState => ({
      ...prevState,
      [event.target.name] : event.target.value
    }))
  }
  const putEquipo = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointEquipo}/${selectId}`, valores, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg); 
      }
      clearFormEquipos();
      getEquipos();
      getEquiposUnidad();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error);
    }
  }
  const putCategory = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointCategory}/${selectIdCategory}`, valoresCategory, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg); 
      }
      clearFormCategory();
      getCategorias()
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error);
    }
  }
  const valorInput = (event) => {
    setValores({
      ...valores,
       [event.target.name] : event.target.value
    })
  }
  const valorInputCategory = (event) => {
    setValoresCategory({
      ...valoresCategory,
       [event.target.name] : event.target.value
    })
  }

  const postEquipo = async (event) => {
    event.preventDefault();
  try {
    const respuesta = await axios.post(endpointEquipo, valores, {
      headers: {
        "token": token
      }
    })
    if (respuesta.status === 200) {
      const msg = respuesta.data.message;
      AlertSucces(msg); 
    }
    clearFormEquipos();
    getEquipos();
    getEquiposUnidad();
  } catch (error) {
    AlertError();
    setErrores(error.response.data.msg)
    console.log(error.response.data.msg);
  }
  }
  const postCategory = async (event) => {
    event.preventDefault();
  try {
    const respuesta = await axios.post(endpointCategory, valoresCategory, {
      headers: {
        "token": token
      }
    })
    if (respuesta.status === 200) {
      const msg = respuesta.data.message;
      AlertSucces(msg); 
    } 
    clearFormCategory();
    getCategorias();
  } catch (error) {
    AlertError();
    setErrores(error.response.data.msg)
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
      label: "FECHA INGRESO",
      options: {
        customBodyRender: (value) => {
          const fecha = moment(value).format('YYYY-MM-DD');
          return fecha;
        }
      }
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
    {
      name: "editar",
      label: "ACTIONS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
              <ButtonEdit icon={<HiMiniPencilSquare />} funcion1={() => getData(tableMeta.rowData)} />
          );
      }
      }
    }
  ]
  const columnasCategorias = [
    {
      name: "id_categoria",
      label: "ID"
    },
    {
      name: "nombre_categoria",
      label: "NOMBRE"
    },
    {
      name: "editar",
      label: "ACTIONS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
              <ButtonEdit icon={<HiMiniPencilSquare />} funcion1={() => getDataCategory(tableMeta.rowData)} />
          );
      }
      }
    }
  ]

  useEffect(() => {
    getEquipos();
    getEquiposUnidad();
    getCategorias();
    getUbicaciones();
    getUbicacionesUnidad();
  },[])

    //#endregion funciones
  return (
    <Container>
      <Contenedor>
        <MediumContainer>
          <MUIDataTable className= "table-medium"
          title="Categorías"
          data={categorias}
          columns={columnasCategorias}
          options={optionsMedium}
           />
        </MediumContainer>
        <HeaderPageTwo 
        icon={<CgToolbox/>} 
        titulo="EQUIPOS" 
        textButton1="REGISTRAR EQUIPO" 
        textButton2="REGISTRAR CATEGORÍA"
         funcion1={() => setModal(true)}
         funcion2={() => setModalCategory(true)}/>
        <Modales>
          <Modal 
          titulo="REGISTRAR EQUIPO"
          estado={modal}
          cambiarEstado={clearFormEquipos}
          >
             <form className="formulario" onSubmit={postEquipo}>
            <div className="inputs-data">
              <div className="filas">
              <div className="contents">
                <label>SERIAL: </label>
              <input name="serial" onChange={valorInput} value={valores.serial} type="text" placeholder="Serial" required/>
              {
                errores && errores.some(([campo]) => campo === "serial") && (
                  <p>
                    {errores.find(([campo]) => campo === "serial")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Nombre: </label>
              <input name="nombre_equipo" onChange={valorInput} value={valores.nombre_equipo} type="text" placeholder="Nombre equipo" required/>
              {
                errores && errores.some(([campo]) => campo === "nombre_equipo") && (
                  <p>
                    {errores.find(([campo]) => campo === "nombre_equipo")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Marca: </label>
              <input name="marca_equipo" onChange={valorInput} value={valores.marca_equipo} type="text" placeholder="Marca del equipo" required/>
              {
                errores && errores.some(([campo]) => campo === "marca_equipo") && (
                  <p>
                    {errores.find(([campo]) => campo === "marca_equipo")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Modelo: </label>
              <input name="modelo_equipo" onChange={valorInput} value={valores.modelo_equipo} type="text" placeholder="Modelo del equipo" required/>
              {
                errores && errores.some(([campo]) => campo === "modelo_equipo") && (
                  <p>
                    {errores.find(([campo]) => campo === "modelo_equipo")[1]}
                  </p>
                )
              }
              </div>
              </div>
              <div className="filas">
              <div className="contents">
              <label>Fecha de Ingreso: </label>
              <input name="fecha_ingreso" onChange={valorInput} value={valores.fecha_ingreso} type="date" required/>
              {
                errores && errores.some(([campo]) => campo === "fecha_ingreso") && (
                  <p>
                    {errores.find(([campo]) => campo === "fecha_ingreso")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
            <label>Tipo de Equipo: </label>
            <input name="tipo_equipo" onChange={valorInput} value={valores.tipo_equipo} type="text" placeholder="tipo de equipo" required/>
            {
                errores && errores.some(([campo]) => campo === "tipo_equipo") && (
                  <p>
                    {errores.find(([campo]) => campo === "tipo_equipo")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
             <label>Categoría: </label>
             <select name="fk_categoria" onChange={valorInput} value={valores.fk_categoria} required>
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
           <select name="estado" onChange={valorInput} value={valores.estado} required>
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
            {
              user && user === "1" ? (
                <select name="fk_ubicacion" onChange={valorInput} value={valores.fk_ubicacion} required>
                <option value="">Seleccione una ubicación</option>
                {
                  ubicaciones.map((ubicaciones) => (
                    <option key={ubicaciones.id_ubicacion} value={ubicaciones.id_ubicacion}>{ubicaciones.nombre_unidad} - {ubicaciones.ambiente} - {ubicaciones.sitio}</option>
                  ))
                }
              </select>
              ):(
                <select name="fk_ubicacion" onChange={valorInput} value={valores.fk_ubicacion} required>
                <option value="">Seleccione una ubicación</option>
                {
                  ubicacionesUnidad.map((ubicaciones) => (
                    <option key={ubicaciones.id_ubicacion} value={ubicaciones.id_ubicacion}>{ubicaciones.nombre_unidad} - {ubicaciones.ambiente} - {ubicaciones.sitio}</option>
                  ))
                }
              </select>
              )
            }
                </div>
              <div className="description">
              <label>Descripción: </label>
              <textarea name="descripcion" maxLength={250} onChange={valorInput} value={valores.descripcion} type="text" placeholder="Agregue una descripción" required/>
              {
                errores && errores.some(([campo]) => campo === "descripcion") && (
                  <p>
                    {errores.find(([campo]) => campo === "descripcion")[1]}
                  </p>
                )
              }
              </div>
            </div>
            </div>
            <button>REGISTRAR</button>
          </form>
          </Modal>
          <Modal 
          titulo="ACTUALIZAR DATOS"
          estado={modalUpdate}
          cambiarEstado={clearFormEquipos}
          >
             <form className="formulario" onSubmit={putEquipo}>
            <div className="inputs-data">
              <div className="filas">
              <div className="contents">
                <label>SERIAL: </label>
              <input name="serial" onChange={editValorInput} value={valores.serial} type="text" placeholder="Serial" required/>
              {
                errores && errores.some(([campo]) => campo === "serial") && (
                  <p>
                    {errores.find(([campo]) => campo === "serial")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Nombre: </label>
              <input name="nombre_equipo" onChange={editValorInput} value={valores.nombre_equipo} type="text" placeholder="Nombre equipo" required/>
              {
                errores && errores.some(([campo]) => campo === "nombre_equipo") && (
                  <p>
                    {errores.find(([campo]) => campo === "nombre_equipo")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Marca: </label>
              <input name="marca_equipo" onChange={editValorInput} value={valores.marca_equipo} type="text" placeholder="Marca del equipo" required/>
              {
                errores && errores.some(([campo]) => campo === "marca_equipo") && (
                  <p>
                    {errores.find(([campo]) => campo === "marca_equipo")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Modelo: </label>
              <input name="modelo_equipo" onChange={editValorInput} value={valores.modelo_equipo} type="text" placeholder="Modelo del equipo" required/>
               {
                errores && errores.some(([campo]) => campo === "modelo_equipo") && (
                  <p>
                    {errores.find(([campo]) => campo === "modelo_equipo")[1]}
                  </p>
                )
              }
              </div>
              </div>
              <div className="filas">
              <div className="contents">
              <label>Fecha de Ingreso: </label>
              <input name="fecha_ingreso" onChange={editValorInput} value={valores.fecha_ingreso} type="date" required/>
              {
                errores && errores.some(([campo]) => campo === "fecha_ingreso") && (
                  <p>
                    {errores.find(([campo]) => campo === "fecha_ingreso")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
            <label>Tipo de Equipo: </label>
            <input name="tipo_equipo" onChange={editValorInput} value={valores.tipo_equipo} type="text" placeholder="tipo de equipo" required/>
            {
                errores && errores.some(([campo]) => campo === "tipo_equipo") && (
                  <p>
                    {errores.find(([campo]) => campo === "tipo_equipo")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
             <label>Categoría: </label>
             <select name="fk_categoria" onChange={editValorInput} value={valores.fk_categoria} required>
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
           <select name="estado" onChange={editValorInput} value={valores.estado} required>
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
             {
              user && user === "1" ? (
                <select name="fk_ubicacion" onChange={valorInput} value={valores.fk_ubicacion} required>
                <option value="">Seleccione una ubicación</option>
                {
                  ubicaciones.map((ubicaciones) => (
                    <option key={ubicaciones.id_ubicacion} value={ubicaciones.id_ubicacion}>{ubicaciones.nombre_unidad} - {ubicaciones.ambiente} - {ubicaciones.sitio}</option>
                  ))
                }
              </select>
              ):(
                <select name="fk_ubicacion" onChange={valorInput} value={valores.fk_ubicacion} required>
                <option value="">Seleccione una ubicación</option>
                {
                  ubicacionesUnidad.map((ubicaciones) => (
                    <option key={ubicaciones.id_ubicacion} value={ubicaciones.id_ubicacion}>{ubicaciones.nombre_unidad} - {ubicaciones.ambiente} - {ubicaciones.sitio}</option>
                  ))
                }
              </select>
              )
            }
                </div>
              <div className="description">
              <label>Descripción: </label>
              <textarea name="descripcion" maxLength={250} onChange={editValorInput} value={valores.descripcion} type="text" placeholder="Agregue una descripción" required/>
              {
                errores && errores.some(([campo]) => campo === "descripcion") && (
                  <p>
                    {errores.find(([campo]) => campo === "descripcion")[1]}
                  </p>
                )
              }
              </div>
            </div>
            </div>
            <button>ACTUALIZAR</button>
          </form>
          </Modal>
          <Modal 
          titulo="REGISTRAR CATEGORÍA"
          estado={modalCategory}
          cambiarEstado={clearFormCategory}
          >
             <form className="formulario" onSubmit={postCategory}>
            <div className="inputs-data-category">
              <div className="filas">
              <div className="contents">
              <TextField name="nombre_categoria" onChange={valorInputCategory} value={valoresCategory.nombre_categoria} variant="outlined" label="Nombre de Categoría" required/>
              {
                errores && errores.some(([campo]) => campo === "nombre_categoria") && (
                  <p>
                    {errores.find(([campo]) => campo === "nombre_categoria")[1]}
                  </p>
                )
              }
              </div>
              </div>
            </div>
            <button>REGISTRAR</button>
          </form>
          </Modal>
          <Modal 
          titulo="ACTUALIZAR CATEGORÍA"
          estado={modalCategoryUpdate}
          cambiarEstado={clearFormCategory}
          >
             <form className="formulario" onSubmit={putCategory}>
            <div className="inputs-data-category">
              <div className="filas">
              <div className="contents">
              <TextField name="nombre_categoria" onChange={editValorInputCategory} value={valoresCategory.nombre_categoria} variant="outlined" label="Nombre de Categoría" required/>
              {
                errores && errores.some(([campo]) => campo === "nombre_categoria") && (
                  <p>
                    {errores.find(([campo]) => campo === "nombre_categoria")[1]}
                  </p>
                )

              }
              </div>
              </div>
            </div>
            <button>ACTUALIZAR</button>
          </form>
          </Modal>
        </Modales>
        <div className="table-mui">
         {
          user && user === "1" ? (
            <MUIDataTable className="table"
            title="Lista de Equipos"
            data={equipos}
            columns={columnas}
            options={options}
            />
          ):(
            <MUIDataTable className="table"
            title="Lista de Equipos"
            data={equiposUnidad}
            columns={columnas}
            options={options}
            />
          )
         }

        </div>
      </Contenedor>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-width: 100%;

  .table-medium{
    width: 90%;
    padding: 5px;

    th{
     background: #38A800;
     color: white;
     padding: 5px;
    }
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
      padding: 5px;
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

    .inputs-data-category{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #38a80030;
      width: 100%;
      border-radius: 10px;
      padding: 10px;
    }
    .inputs-data{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      background: #38a80030;
      border-radius: 20px;
      padding: 10px;

      select{
        padding: 4px;
        min-width: 150px;
        border: none;
        outline: none;
      }
      textarea{
        min-width: 150px;
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
.filas{
  display: flex;
  flex-direction: column;
  gap: 10px;

  .description{
    display: flex;
    flex-direction: column;
    background: white;
    width: 300px;
    height: 230px;
    padding: 5px;
    border-radius: 5px;
    gap: 5px;
    
    p{
      color: red;
      font-size: 12px;
    }

    label{
      font-size: 14px;
      font-weight: 600;
    }
  }

}

  .contents{
    display: flex;
    flex-direction: column;
    background: white;
    width: 300px;
    height: 70px;
    padding: 5px;
    border-radius: 5px;
    gap: 5px;
    
    p{
      color: red;
      font-size: 12px;
    }

    label{
      font-size: 14px;
      font-weight: 600;
    }
  }
`;
export default Equipos