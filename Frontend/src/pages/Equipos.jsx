import HeaderPageTwo from "../components/organismos/HeaderPageTwo";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useEffect, useState } from "react";
import { options, optionsMedium } from "../components/styles/Table";
import Modal from "../components/modals/Modal";
import ButtonEdit from "../components/organismos/ButtonEdit";
import moment from "moment"
import { CgToolbox } from "react-icons/cg";
import { Contenedor } from "../components/styles/StylesPages";
import { AlertSucces, AlertError } from "../components/alerts/Alerts";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Select, TextField } from "@mui/material";
import {
  endpointEquipo,
  endpointCategoria,
  endpointUbicacion
} from "../components/endpoints/Endpoints";
import { Container, Modales } from "../components/styles/StylesEquipos";
import ContentInput from "../components/organismos/ContentInput";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import BasicTabs from "../components/tabs/TabEquipos"
import Textarea from '@mui/joy/Textarea';

import TotalEquipments from "../components/graphics/Equipments";

function Equipos() {

  //#region funciones

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
      await axios.get(endpointEquipo).then((response) => {
        const equipment = response.data;
        setEquipos(equipment);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getEquiposUnidad = async () => {
    try {
      await axios.get(`${endpointEquipo}/${unidadUser}`).then((response) => {
        const equipment = response.data;
        setEquiposUnidad(equipment);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getCategorias = async () => {
    try {
      await axios.get(endpointCategoria).then((response) => {
        const categories = response.data;
        setCategorias(categories);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getUbicaciones = async () => {
    try {
      await axios.get(endpointUbicacion).then((response) => {
        const ubication = response.data;
        setUbicaciones(ubication);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getUbicacionesUnidad = async () => {
    try {
      await axios.get(`${endpointUbicacion}/${unidadUser}`).then((response) => {
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
    const categoriaEquipoId = categoriaEquipo ? categoriaEquipo.id_categoria : "";

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
      [event.target.name]: event.target.value
    }))
  }
  const editValorInputCategory = (event) => {
    setValoresCategory(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
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
      const respuesta = await axios.put(`${endpointCategoria}/${selectIdCategory}`, valoresCategory, {
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
      [event.target.name]: event.target.value
    })
  }
  const valorInputCategory = (event) => {
    setValoresCategory({
      ...valoresCategory,
      [event.target.name]: event.target.value
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
      const respuesta = await axios.post(endpointCategoria, valoresCategory, {
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
        display: 'false' //
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
      label: "SITIO",
      options: {
       display: 'false' // Esta opción oculta la columna en la interfaz
     }
    },
    {
      name: "tipo_equipo",
      label: "TIPO",
      options: {
       display: 'false' // Esta opción oculta la columna en la interfaz
     }
    },
    {
      name: "marca_equipo",
      label: "MARCA",
      options: {
       display: 'false' // Esta opción oculta la columna en la interfaz
     }
    },
    {
      name: "modelo_equipo",
      label: "MODELO",
      options: {
       display: 'false' // Esta opción oculta la columna en la interfaz
     }
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
            <ButtonEdit titulo="Actualizar" icon={<HiMiniPencilSquare />} funcion1={() => getData(tableMeta.rowData)} />
          );
        }
      }
    }
  ]
  const columnasCategorias = [
    {
      name: "id_categoria",
      label: "ID",
      options: {
       display: 'false' // Esta opción oculta la columna en la interfaz
     }
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
            <ButtonEdit titulo="Actualizar" icon={<HiMiniPencilSquare />} funcion1={() => getDataCategory(tableMeta.rowData)} />
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
  }, [])

  //#endregion funciones
  return (
    <Container>
      <Contenedor>
        <HeaderPageTwo
          icon={<CgToolbox />}
          titulo="EQUIPOS"
          textButton1="REGISTRAR EQUIPO"
          textButton2="REGISTRAR CATEGORÍA"
          funcion1={() => setModal(true)}
          funcion2={() => setModalCategory(true)} />
        <Modales>
          <Modal
            titulo="REGISTRAR EQUIPO"
            estado={modal}
            cambiarEstado={clearFormEquipos}
          >
            <form className="formulario" onSubmit={postEquipo}>
              <div className="inputs-data">
                <div className="filas">
                  <ContentInput>
                    <TextField name="serial" onChange={valorInput} value={valores.serial} type="text" label="Serial" required />
                    {
                      errores && errores.some(([campo]) => campo === "serial") && (
                        <p>
                          {errores.find(([campo]) => campo === "serial")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="nombre_equipo" onChange={valorInput} value={valores.nombre_equipo} type="text" label="Nombre" required />
                    {
                      errores && errores.some(([campo]) => campo === "nombre_equipo") && (
                        <p>
                          {errores.find(([campo]) => campo === "nombre_equipo")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="marca_equipo" onChange={valorInput} value={valores.marca_equipo} type="text" label="Marca" required />
                    {
                      errores && errores.some(([campo]) => campo === "marca_equipo") && (
                        <p>
                          {errores.find(([campo]) => campo === "marca_equipo")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="modelo_equipo" onChange={valorInput} value={valores.modelo_equipo} type="text" label="Modelo" required />
                    {
                      errores && errores.some(([campo]) => campo === "modelo_equipo") && (
                        <p>
                          {errores.find(([campo]) => campo === "modelo_equipo")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                </div>
                <div className="filas">
                  <ContentInput>
                    <TextField name="fecha_ingreso" onChange={valorInput} value={valores.fecha_ingreso} type="date" required />
                    {
                      errores && errores.some(([campo]) => campo === "fecha_ingreso") && (
                        <p>
                          {errores.find(([campo]) => campo === "fecha_ingreso")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="tipo_equipo" onChange={valorInput} value={valores.tipo_equipo} type="text" label="tipo de equipo" required />
                    {
                      errores && errores.some(([campo]) => campo === "tipo_equipo") && (
                        <p>
                          {errores.find(([campo]) => campo === "tipo_equipo")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <FormControl>
                      <InputLabel>Categoría</InputLabel>
                      <Select label="Categoría" name="fk_categoria" onChange={valorInput} value={valores.fk_categoria} required>
                        {
                          categorias.map((categorias) => (
                            <MenuItem key={categorias.id_categoria} value={categorias.id_categoria}>{categorias.nombre_categoria}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </ContentInput>
                  <ContentInput>
                    <FormControl>
                      <InputLabel>Estado</InputLabel>
                      <Select label="Estado" name="estado" onChange={valorInput} value={valores.estado} required>
                        <MenuItem value="activo">Activo</MenuItem>
                        <MenuItem value="inactivo">Inactivo</MenuItem>
                        <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
                        <MenuItem value="excluido">Excluido</MenuItem>
                      </Select>
                    </FormControl>
                  </ContentInput>
                </div>
                <div className="filas">
                  <ContentInput>
                    <FormControl>
                      <InputLabel>Ubicación</InputLabel>
                      {
                        user && user === "1" ? (
                          <Select label="Ubicación" name="fk_ubicacion" onChange={valorInput} value={valores.fk_ubicacion} required>
                            {
                              ubicaciones.map((ubicaciones) => (
                                <MenuItem key={ubicaciones.id_ubicacion} value={ubicaciones.id_ubicacion}>{ubicaciones.nombre_unidad} - {ubicaciones.ambiente} - {ubicaciones.sitio}</MenuItem>
                              ))
                            }
                          </Select>
                        ) : (
                          <Select label="Ubicación" name="fk_ubicacion" onChange={valorInput} value={valores.fk_ubicacion} required>
                            {
                              ubicacionesUnidad.map((ubicaciones) => (
                                <MenuItem key={ubicaciones.id_ubicacion} value={ubicaciones.id_ubicacion}>{ubicaciones.nombre_unidad} - {ubicaciones.ambiente} - {ubicaciones.sitio}</MenuItem>
                              ))
                            }
                          </Select>
                        )
                      }
                    </FormControl>
                  </ContentInput>
                    <Textarea className='description'
                      name="descripcion"
                      onChange={valorInput} value={valores.descripcion}
                      placeholder="Descripción"
                      required
                      disabled={false}
                      minRows={8}
                      size="md"
                      variant="outlined"
                    />
                    {
                      errores && errores.some(([campo]) => campo === "descripcion") && (
                        <p>
                          {errores.find(([campo]) => campo === "descripcion")[1]}
                        </p>
                      )
                    }
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
                  <ContentInput>
                    <TextField label="Serial" name="serial" onChange={editValorInput} value={valores.serial} type="text" required />
                    {
                      errores && errores.some(([campo]) => campo === "serial") && (
                        <p>
                          {errores.find(([campo]) => campo === "serial")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="nombre_equipo" onChange={editValorInput} value={valores.nombre_equipo} type="text" label="Nombre equipo" required />
                    {
                      errores && errores.some(([campo]) => campo === "nombre_equipo") && (
                        <p>
                          {errores.find(([campo]) => campo === "nombre_equipo")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="marca_equipo" onChange={editValorInput} value={valores.marca_equipo} type="text" label="Marca del equipo" required />
                    {
                      errores && errores.some(([campo]) => campo === "marca_equipo") && (
                        <p>
                          {errores.find(([campo]) => campo === "marca_equipo")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="modelo_equipo" onChange={editValorInput} value={valores.modelo_equipo} type="text" label="Modelo del equipo" required />
                    {
                      errores && errores.some(([campo]) => campo === "modelo_equipo") && (
                        <p>
                          {errores.find(([campo]) => campo === "modelo_equipo")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                </div>
                <div className="filas">
                  <ContentInput>
                    <TextField name="fecha_ingreso" onChange={editValorInput} value={valores.fecha_ingreso} type="date" required />
                    {
                      errores && errores.some(([campo]) => campo === "fecha_ingreso") && (
                        <p>
                          {errores.find(([campo]) => campo === "fecha_ingreso")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="tipo_equipo" onChange={editValorInput} value={valores.tipo_equipo} type="text" label="tipo de equipo" required />
                    {
                      errores && errores.some(([campo]) => campo === "tipo_equipo") && (
                        <p>
                          {errores.find(([campo]) => campo === "tipo_equipo")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <FormControl>
                      <InputLabel>Categoría: </InputLabel>
                      <Select label="Categoría" name="fk_categoria" onChange={editValorInput} value={valores.fk_categoria} required>
                        {
                          categorias.map((categorias) => (
                            <MenuItem key={categorias.id_categoria} value={categorias.id_categoria}>{categorias.nombre_categoria}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </ContentInput>
                  <ContentInput>
                    <FormControl>
                      <InputLabel>Estado: </InputLabel>
                      <Select label="Estado" name="estado" onChange={editValorInput} value={valores.estado} required>
                        <MenuItem value="activo">Activo</MenuItem>
                        <MenuItem value="inactivo">Inactivo</MenuItem>
                        <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
                        <MenuItem value="excluido">Excluido</MenuItem>
                      </Select>
                    </FormControl>
                  </ContentInput>
                </div>
                <div className="filas">
                  <ContentInput>
                    <FormControl>
                      <InputLabel>Ubicación: </InputLabel>
                      {
                        user && user === "1" ? (
                          <Select label="Ubicación" name="fk_ubicacion" onChange={valorInput} value={valores.fk_ubicacion} required>
                            <MenuItem value="">Seleccione una ubicación</MenuItem>
                            {
                              ubicaciones.map((ubicaciones) => (
                                <MenuItem key={ubicaciones.id_ubicacion} value={ubicaciones.id_ubicacion}>{ubicaciones.nombre_unidad} - {ubicaciones.ambiente} - {ubicaciones.sitio}</MenuItem>
                              ))
                            }
                          </Select>
                        ) : (
                          <Select label="Ubicación" name="fk_ubicacion" onChange={valorInput} value={valores.fk_ubicacion} required>
                            <MenuItem value="">Seleccione una ubicación</MenuItem>
                            {
                              ubicacionesUnidad.map((ubicaciones) => (
                                <MenuItem key={ubicaciones.id_ubicacion} value={ubicaciones.id_ubicacion}>{ubicaciones.nombre_unidad} - {ubicaciones.ambiente} - {ubicaciones.sitio}</MenuItem>
                              ))
                            }
                          </Select>
                        )
                      }
                    </FormControl>
                  </ContentInput>
                    <Textarea className='description'
                      name="descripcion"
                      onChange={editValorInput} value={valores.descripcion}
                      placeholder="Descripción"
                      required
                      disabled={false}
                      minRows={8}
                      size="md"
                      variant="outlined"
                    />
                    {
                      errores && errores.some(([campo]) => campo === "descripcion") && (
                        <p>
                          {errores.find(([campo]) => campo === "descripcion")[1]}
                        </p>
                      )
                    }
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
                  <ContentInput>
                    <TextField name="nombre_categoria" onChange={valorInputCategory} value={valoresCategory.nombre_categoria} label="Nombre" required />
                    {
                      errores && errores.some(([campo]) => campo === "nombre_categoria") && (
                        <p>
                          {errores.find(([campo]) => campo === "nombre_categoria")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
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
                  <ContentInput>
                    <TextField name="nombre_categoria" onChange={editValorInputCategory} value={valoresCategory.nombre_categoria} label="Nombre de Categoría" required />
                    {
                      errores && errores.some(([campo]) => campo === "nombre_categoria") && (
                        <p>
                          {errores.find(([campo]) => campo === "nombre_categoria")[1]}
                        </p>
                      )

                    }
                  </ContentInput>
                </div>
              </div>
              <button>ACTUALIZAR</button>
            </form>
          </Modal>
        </Modales>
        <BasicTabs
          text1="Equipos"
          text2="Categorías" >
          <div className="table-mui">
            {
              user && user === "1" ? (
                <MUIDataTable className="table"
                title="Lista de Equipos"
                  data={equipos}
                  columns={columnas}
                  options={options}
                />
              ) : (
                <MUIDataTable className="table"
                  title="Lista de Equipos"
                  data={equiposUnidad}
                  columns={columnas}
                  options={options}
                />
              )
            }
          </div>
          <div className="table-mui">
            <div className="category-graphic">
              <h2>Equipos por categoría</h2>
            <TotalEquipments/>
            </div>
            <MUIDataTable className="table-category"
            title="Lista de Categorías"
              data={categorias}
              columns={columnasCategorias}
              options={optionsMedium}
            />
          </div>
        </BasicTabs>
      </Contenedor>
    </Container>
  )
}

export default Equipos