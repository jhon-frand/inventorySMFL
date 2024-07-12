import HeaderPageTwo from "../components/organismos/HeaderPageTwo";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ContainerTable, options } from "../components/styles/Table";
import Modal from "../components/modals/Modal";
import ButtonEdit from "../components/organismos/ButtonEdit";
import moment from "moment"
import { CgToolbox } from "react-icons/cg";
import { Contenedor } from "../components/styles/StylesPages";
import { AlertSucces, AlertError, AlertNotFound } from "../components/alerts/Alerts";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Select, TextField } from "@mui/material";
import {
  endpointEquipo,
  endpointCategoria,
  endpointUbicacion,
  endpointMantenimiento,
  endpointUser,
  endpoint
} from "../components/endpoints/Endpoints";
import { Container, Modales } from "../components/styles/StylesEquipos";
import ContentInput from "../components/organismos/ContentInput";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import BasicTabs from "../components/tabs/TabEquipos"
import { FaSquarePlus } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import TableModal from "../components/modals/TableModal";
import EquipoManteinment from "../components/tables/EquipoManteinment";
import EquipoActive from "../components/tables/EquipoActive";
import EquipoInactive from "../components/tables/EquipoInactive";
import EquipoExcluded from "../components/tables/EquipoExcluded";
import ModalButton from "../components/buttons/ModalButton"
import { MdPermMedia } from "react-icons/md";
import { Button } from "@mui/material";
import ModalImg from "../components/modals/ModalImg";

function Equipos() {

  //#region funciones
  //#region constantes

  const [equipos, setEquipos] = useState([])
  const [equiposUnidad, setEquiposUnidad] = useState([])
  const [categorias, setCategorias] = useState([])
  const [ubicaciones, setUbicaciones] = useState([])
  const [ubicacionesUnidad, setUbicacionesUnidad] = useState([])
  const [modal, setModal] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalCategory, setModalCategory] = useState(false)
  const [modalCategoryUpdate, setModalCategoryUpdate] = useState(false)
  const [modalManteinment, setModalManteinment] = useState(false)
  const [modalFormMantinment, setModalFormMantinment] = useState(false)
  const [selectId, setSelectId] = useState(null)
  const [selectIdCategory, setSelectIdCategory] = useState(null)
  const [mantenimientos, setMantenimientos] = useState([])
  const [errores, setErrores] = useState("")
  const [usuarios, setUsuarios] = useState([])
  const [idEquipo, setIdEquipo] = useState("")

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const unidadUser = localStorage.getItem("unidad");
  const nombresUser = localStorage.getItem("nombres")
  const idUser = localStorage.getItem("usuario");

  //#endregion constantes

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [idUpdateImg, setIdUpdateImg] = useState(null)

  // Función para manejar el clic en la imagen
  const handleImageClick = (imagePath, idEquipo) => {
    //si la imagen es nula o indefinida no se va a abrir el modal
    if (imagePath && imagePath !== `${endpoint}/public/images/null` && imagePath !== `${endpoint}/public/images/undefined`) {
      setSelectedImage(imagePath);
      setModalOpen(true);
      setIdUpdateImg(idEquipo);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setIdUpdateImg(null);
  };


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
      console.log(error.response.data);
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
  const getMantenimientosEquipo = async (id) => {
    try {
      const respuesta = await axios.get(`${endpointMantenimiento}/equipo/${id}`).then((response) => {
        const mantenimientos = response.data;
        setMantenimientos(mantenimientos)
        setModalManteinment(true);

        console.log(mantenimientos);
      })
    } catch (error) {
      AlertNotFound(error.response.data.msg)
      console.log(error)
    }
  }
  const getUsers = async () => {
    try {
      await axios.get(endpointUser).then((response) => {
        const users = response.data;
        setUsuarios(users);
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
    estado: "activo",
    placa_sena: "",
    observaciones: "",
    fk_categoria: "",
    fk_ubicacion: "",
    imagen: null
  })
  const [valoresManteinment, setValoresManteinment] = useState({
    tipo_mantenimiento: "",
    fecha_mantenimiento: "",
    descripcion: "",
    fk_user_responsable: "",
    fk_equipo: ""
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
      estado: "activo",
      placa_sena: "",
      observaciones: "",
      fk_categoria: "",
      fk_ubicacion: "",
      imagen: null
    })
    setPreview(null);
    setErrores("")
    setSelectId(null)
    setModalUpdate(false)
    setModal(false)
  }
  const clearFormManteinment = () => {
    setValoresManteinment({
      tipo_mantenimiento: "",
      fecha_mantenimiento: "",
      descripcion: "",
      fk_user_responsable: "",
      fk_equipo: ""
    })
    setErrores("")
    setModalFormMantinment(false)
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
      descripcion: datos[12],
      placa_sena: datos[13],
      observaciones: datos[14],
    })
    setSelectId(datos[0])
    setModalUpdate(true)
  }
  const getIdEquipo = (datos) => {
    try {
      const equipo = datos[0]
      setIdEquipo(equipo);
      setValoresManteinment(prevState => ({
        ...prevState,
        fk_equipo: equipo,
        fk_user_responsable: idUser,
      }))
      setModalFormMantinment(true)
    } catch (error) {
      console.log(error)
    }
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
    const { name, value, files } = event.target;
    if (name === 'imagen') {
      const file = files[0];
      setValores({
        ...valores,
        imagen: file
      });
      setPreview(URL.createObjectURL(file));
    } else {
      setValores({
        ...valores,
        [name]: value
      });
    }
  };

  const valorInputCategory = (event) => {
    setValoresCategory({
      ...valoresCategory,
      [event.target.name]: event.target.value
    })
  }
  const valorInputManteinment = (event) => {
    setValoresManteinment({
      ...valoresManteinment,
      [event.target.name]: event.target.value
    })
  }

  const postEquipo = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      for (const key in valores) {
        formData.append(key, valores[key]);
      }

      const respuesta = await axios.post(endpointEquipo, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "token": token
        }
      });

      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearFormEquipos();
      getEquipos();
      getEquiposUnidad();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

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

  const postManteinment = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpointMantenimiento, valoresManteinment, {
        headers: {
          "token": token
        }
      })

      if (respuesta.status === 200) {
        await axios.put(`${endpointEquipo}/estado/${idEquipo}`, {
          estado: "mantenimiento"
        });
        
        getEquipos();
        AlertSucces("Mantenimiento Registrado")
      }
      clearFormManteinment()
    } catch (error) {
      setErrores(error.response.data.msg)
      AlertError()
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
      label: "DESCRIPCIÓN",
      options: {
        display: 'false'
      }
    },
    {
      name: "placa_sena",
      label: "PLACA SENA",
      options: {
        display: 'false'
      }
    },
    {
      name: "observaciones",
      label: "OBSERVACIONES",
      options: {
        display: 'false'
      }
    },
    {
      name: "imagen",
      label: "IMAGEN",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const imagePath = `${endpoint}/public/images/${value}`;
          const idEquipo = tableMeta.rowData[0];
          return (
            <Button variant="text" color="success" size="small" onClick={() => handleImageClick(imagePath, idEquipo)}
              //si el valor del botón no existe, es nulo o indefinido, no va a permitir dar click
              disabled={!value || value === 'null' || value === 'undefined'}>
              Ver Imagen
            </Button>
          );
        }
      }
    },
    {
      name: "editar",
      label: "ACTIONS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div className="btns-edit">
                <ButtonEdit titulo="Actualizar" icon={<HiMiniPencilSquare />} funcion1={() => getData(tableMeta.rowData)} />
                <ButtonEdit titulo="Registrar Mantenimiento" icon={<FaSquarePlus />} funcion1={() => getIdEquipo(tableMeta.rowData)} />
                <IoEyeSharp title="Ver Mantenimientos" className="icon-activity" onClick={() => getMantenimientosEquipo(tableMeta.rowData[0])} />
              </div>
            </>
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

  const columnasManteinments = [
    {
      name: "tipo_mantenimiento",
      label: "TIPO"
    },
    {
      name: "fecha_mantenimiento",
      label: "FECHA",
      options: {
        customBodyRender: (value) => {
          const fecha = moment(value).format('YYYY-MM-DD');
          return fecha;
        }
      }
    },
    {
      name: "nombres",
      label: "RESPONSABLE"
    },
    {
      name: "descripcion",
      label: "DESCRIPCIÓN"
    },
  ]

  useEffect(() => {
    getEquipos();
    getUsers();
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
          <ModalImg
            estado={modalOpen}
            cambiarEstado={handleCloseModal}
            idUpdate={idUpdateImg}
            actualizarEquipos={getEquipos}
          >
            {selectedImage && (

              <img src={selectedImage} alt="Equipo" />

            )}
          </ModalImg>
          <Modal
            titulo="REGISTRAR EQUIPO"
            estado={modal}
            cambiarEstado={clearFormEquipos}
          >
            <form className="formulario" onSubmit={postEquipo}>
              <div className="inputs-data">
                <div className="fila-one">
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
                  <ContentInput>
                    <TextField name="placa_sena" onChange={valorInput} value={valores.placa_sena} type="text" label="Placa SENA" required />
                    {
                      errores && errores.some(([campo]) => campo === "placa_sena") && (
                        <p>
                          {errores.find(([campo]) => campo === "placa_sena")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                </div>
                <div className="fila-two">
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
                  <div className="input-description">
                    <TextField
                      name="descripcion"
                      onChange={valorInput} value={valores.descripcion}
                      label="Descripción"
                      required
                      multiline
                      rows={4}
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
                <div className="fila-three">
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
                  <div className="input-observation">
                    <TextField
                      name="observaciones"
                      onChange={valorInput} value={valores.observaciones}
                      label="Observaciones"
                      multiline
                      rows={3}
                    />
                    {
                      errores && errores.some(([campo]) => campo === "observaciones") && (
                        <p>
                          {errores.find(([campo]) => campo === "observaciones")[1]}
                        </p>
                      )
                    }
                  </div>
                  <div className="imagen-input">
                    <button className="btn-img" type="button" title="Cargar imagen del equipo" onClick={handleFileButtonClick}><MdPermMedia />Cargar Imagen</button>
                    <input
                      type="file"
                      name="imagen"
                      onChange={valorInput}
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                    />
                    <div>
                      {preview && <img src={preview} alt="Vista previa" style={{ maxHeight: '150px', maxWidth: '150px' }} />}
                    </div>

                  </div>
                </div>
              </div>
              <ModalButton
                text="REGISTRAR" />
            </form>
          </Modal>
          <Modal
            titulo="ACTUALIZAR DATOS"
            estado={modalUpdate}
            cambiarEstado={clearFormEquipos}
          >
            <form className="formulario" onSubmit={putEquipo}>
              <div className="inputs-data">
                <div className="fila-one">
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
                <div className="fila-two">
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
                    <TextField name="placa_sena" onChange={editValorInput} value={valores.placa_sena} type="text" label="Placa SENA" required />
                    {
                      errores && errores.some(([campo]) => campo === "placa_sena") && (
                        <p>
                          {errores.find(([campo]) => campo === "placa_sena")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                </div>
                <div className="fila-three">
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
                  <div className="input-description-update">
                    <TextField
                      name="descripcion"
                      onChange={editValorInput} value={valores.descripcion}
                      label="Descripción"
                      multiline
                      required
                      rows={3}
                    />
                    {
                      errores && errores.some(([campo]) => campo === "descripcion") && (
                        <p>
                          {errores.find(([campo]) => campo === "descripcion")[1]}
                        </p>
                      )
                    }
                  </div>
                  <div className="input-observation-update">
                    <TextField
                      name="observaciones"
                      onChange={editValorInput} value={valores.observaciones}
                      label="Observaciones"
                      multiline
                      rows={3}
                    />
                    {
                      errores && errores.some(([campo]) => campo === "observaciones") && (
                        <p>
                          {errores.find(([campo]) => campo === "observaciones")[1]}
                        </p>
                      )
                    }
                  </div>

                </div>
              </div>
              <ModalButton
                text="ACTUALIZAR" />
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
              <ModalButton
                text="REGISTRAR" />
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
              <ModalButton text="ACTUALIZAR" />
            </form>
          </Modal>
          <Modal
            titulo="REGISTRAR MANTENIMIENTO"
            estado={modalFormMantinment}
            cambiarEstado={clearFormManteinment}
          >
            <form className="form-manteinment" onSubmit={postManteinment}>
              <div className="content-rows">
                <div className="row-one">
                  <div className="inputs-row-one">
                    <ContentInput>
                      <FormControl>
                        <InputLabel>Tipo</InputLabel>
                        <Select label="Tipo" name="tipo_mantenimiento" value={valoresManteinment.tipo_mantenimiento} onChange={valorInputManteinment} required>
                          <MenuItem value="predictivo">Predictivo</MenuItem>
                          <MenuItem value="preventivo">Preventivo</MenuItem>
                          <MenuItem value="correctivo">Correctivo</MenuItem>
                        </Select>
                      </FormControl>

                    </ContentInput>
                    <ContentInput>
                      <TextField name="fecha_mantenimiento" type="date" value={valoresManteinment.fecha_mantenimiento} onChange={valorInputManteinment} required />

                    </ContentInput>
                  </div>
                  <div className="inputs-two-row-one">
                    <ContentInput className={`${user === "1" ? '' : 'onlyRead'}`}>

                      {
                        user && user === "2" ? (
                          <div className="inputs-encar">
                            <TextField
                              label="ID"
                              name="fk_user_responsable"
                              type="number"
                              value={valoresManteinment.fk_user_responsable}
                              onChange={valorInputManteinment} readOnly
                              style={{ display: 'none' }}
                            />
                            <TextField label="Responsable" value={nombresUser} readOnly />
                          </div>
                        ) : (
                          <FormControl>
                            <InputLabel>Responsable</InputLabel>
                            <Select label="Responsable" name="fk_user_responsable" value={valoresManteinment.fk_user_responsable} onChange={valorInputManteinment} required>
                              {
                                usuarios.map((usuarios) => (
                                  <MenuItem value={usuarios.id_usuario} key={usuarios.id_usuario}>{usuarios.nombres} {usuarios.apellidos}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        )
                      }

                    </ContentInput>
                    <ContentInput>
                      <TextField label="Equipo" name="fk_equipo" type="text" value={valoresManteinment.fk_equipo} required />
                    </ContentInput>
                  </div>
                </div>
                <div className="row-two">
                  <div className="description">
                    <TextField className="text-description"
                      name="descripcion"
                      value={valoresManteinment.descripcion}
                      onChange={valorInputManteinment}
                      rows={4}
                      multiline
                      label="Descripción"
                      required />
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
              <ModalButton
                text="REGISTRAR" />
            </form>
          </Modal>
        </Modales>
        <BasicTabs
          text1="Todos"
          text2="Mantenimiento"
          text3="Activos"
          text4="Inactivos"
          text5="Excluidos"
          text6="Categorías" >

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
          <ContainerTable>
            <EquipoManteinment />
          </ContainerTable>
          <ContainerTable>
            <EquipoActive />
          </ContainerTable>
          <ContainerTable>
            <EquipoInactive />
          </ContainerTable>
          <ContainerTable>
            <EquipoExcluded />
          </ContainerTable>
          <ContainerTable>

            <MUIDataTable className="table-data-category"
              title="Lista de Categorías"
              data={categorias}
              columns={columnasCategorias}
              options={options}
            />
          </ContainerTable>
        </BasicTabs>
        <TableModal
          estado={modalManteinment}
          cambiarEstado={() => setModalManteinment(false)}
          title="Mantenimientos"
          titulo="LISTA DE MANTENIMIENTOS"
          datos={mantenimientos}
          columnas={columnasManteinments}

        />
      </Contenedor>
    </Container>
  )
}

export default Equipos