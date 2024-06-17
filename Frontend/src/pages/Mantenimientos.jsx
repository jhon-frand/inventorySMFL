import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useEffect, useState } from "react";
import { options, optionsMedium } from "../components/styles/Table";
import Modal from "../components/modals/Modal";
import ButtonEdit from "../components/organismos/ButtonEdit";
import moment from "moment";
import { GoTools } from "react-icons/go";
import { IoEyeSharp } from "react-icons/io5";
import { Contenedor } from "../components/styles/StylesPages";
import { AlertSucces, AlertError, AlertNotFound } from "../components/alerts/Alerts";
import HeaderPageMante from "../components/organismos/HeaderPageMante";
import {
  endpointMantenimiento,
  endpointTecnico,
  endpointActividad,
  endpointEquipo,
  endpointUser
} from "../components/endpoints/Endpoints";
import TableModal from "../components/modals/TableModal";
import { FaSquarePlus } from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Container, Modales } from "../components/styles/StylesMantenimientos";
import BasicTabs from "../components/tabs/TabManteinment"
import { Select, TextField } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import ContentInput from "../components/organismos/ContentInput";

function Mantenimientos() {
  //#region funciones

  const [mantenimientos, setMantenimientos] = useState([])
  const [mantenimientosUnit, setMantenimientosUnit] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [equipos, setEquipos] = useState([])
  const [equiposUnidad, setEquiposUnidad] = useState([])
  const [tecnicos, setTecnicos] = useState([])
  const [actividades, setActividades] = useState([])
  const [actividadesMantenimiento, setActividadesMantenimiento] = useState([])
  const [actividadesUnit, setActividadesUnit] = useState([])
  const [modal, setModal] = useState(false)
  const [modalTable, setModalTable] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalActividad, setModalActividad] = useState(false)
  const [modalActividadUpdate, setModalActividadUpdate] = useState(false)
  const [modalTecnico, setModalTecnico] = useState(false)
  const [modalUpdateTecnico, setModalUpdateTecnico] = useState(false)
  const [selectId, setSelectId] = useState(null)
  const [selectIdActividad, setSelectIdActividad] = useState(null)
  const [selectIdTecnico, setSelectIdTecnico] = useState(null)
  const [errores, setErrores] = useState("")

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const nombresUser = localStorage.getItem("nombres")
  const unidadUser = localStorage.getItem("unidad");
  const idUser = localStorage.getItem("usuario");


  const getActividades = async () => {
    try {
      await axios.get(endpointActividad).then((response) => {
        const activities = response.data;
        setActividades(activities);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const getActividadesUnidad = async () => {
    try {
      await axios.get(`${endpointActividad}/${unidadUser}`).then((response) => {
        const activities = response.data;
        setActividadesUnit(activities);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getActividadesMantenimiento = async (id) => {
    try {
     const respuesta =  await axios.get(`${endpointActividad}/mantenimiento/${id}`).then((response) => {
        const activitiesManten = response.data;
        console.log(activitiesManten);
        setActividadesMantenimiento(activitiesManten);
        setModalTable(true);
      })

    } catch (error) {
      AlertNotFound(error.response.data.message);
      console.log(error);
    }
  }

  const getMantenimientos = async () => {
    try {
      await axios.get(endpointMantenimiento).then((response) => {
        const manteinments = response.data;
        setMantenimientos(manteinments);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getMantenimientosUnidad = async () => {
    try {
      await axios.get(`${endpointMantenimiento}/${unidadUser}`).then((response) => {
        const manteinmentUnit = response.data;
        setMantenimientosUnit(manteinmentUnit);
      })

    } catch (error) {
      console.log(error);
    }
  }
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
  const getTecnicos = async () => {
    try {
      await axios.get(endpointTecnico).then((response) => {
        const technic = response.data;
        setTecnicos(technic);
      })
    } catch (error) {
      console.log(error);
    }
  }
  const [valores, setValores] = useState({
    tipo_mantenimiento: "",
    fecha_mantenimiento: "",
    descripcion: "",
    fk_user_responsable: "",
    fk_equipo: ""
  })
  const [valoresActividad, setValoresActividad] = useState({
    fecha_actividad: "",
    descripcion: "",
    fk_mantenimiento: "",
    fk_tecnico: ""
  })
  const clearForm = () => {
    setValores({
      tipo_mantenimiento: "",
      fecha_mantenimiento: "",
      descripcion: "",
      fk_user_responsable: "",
      fk_equipo: ""
    })
    setErrores("")
    setSelectId(null)
    setModal(false)
    setModalUpdate(false)
  }
  const [valoresTecnico, setValoresTecnico] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: ""
  })
  const clearFormTecnico = () => {
    setValoresTecnico({
      identificacion: "",
      nombres: "",
      apellidos: "",
      correo: "",
      telefono: ""
    })
    setErrores("")
    setSelectIdTecnico(null)
    setModalTecnico(false)
    setModalUpdateTecnico(false)
  }

  const getDataTecnico = (datos) => {
    setValoresTecnico({
      identificacion: datos[1],
      nombres: datos[2],
      apellidos: datos[3],
      correo: datos[4],
      telefono: datos[5]
    })
    setSelectIdTecnico(datos[0])
    setModalUpdateTecnico(true)
  }
  const clearFormActivity = () => {
    setValoresActividad({
      fecha_actividad: "",
      descripcion: "",
      fk_mantenimiento: "",
      fk_tecnico: ""
    })
    setErrores("")
    setModalActividad(false)
    setModalActividadUpdate(false)
  }
  const getData = (datos) => {

    const equipoManteinment = equipos.find(equipment => equipment.nombre_equipo === datos[5]);
    const equipoManteinmentId = equipoManteinment ? equipoManteinment.id_equipo : "";

    const userResponsable = usuarios.find(user => user.nombres === datos[4]);
    const userResponsableId = userResponsable ? userResponsable.id_usuario : "";

    const fecha = moment(datos[2]).format('YYYY-MM-DD');
    setValores({
      tipo_mantenimiento: datos[1],
      fecha_mantenimiento: fecha,
      descripcion: datos[3],
      fk_user_responsable: userResponsableId,
      fk_equipo: equipoManteinmentId
    })
    setSelectId(datos[0]);
    setModalUpdate(true);
  }
  const getIdMantenimiento = (datos) => {
    try {
      setValoresActividad(prevState => ({
        ...prevState,
        fk_mantenimiento: datos[0]
      }));
      setModalActividad(true)
    } catch (error) {
      console.log(error);
    }
  }
  const getIdUser = () => {
    try {
      setValores(prevState => ({
        ...prevState,
        fk_user_responsable: idUser
      }))
      setModal(true)
    } catch (error) {
      console.log(error);
    }
  }
  const getDataActividad = (datos) => {

    const tecnicoActividad = tecnicos.find(tenic => tenic.nombres === datos[4]);
    const tecnicoActividadId = tecnicoActividad ? tecnicoActividad.id_tecnico : "";

    const fecha = moment(datos[1]).format('YYYY-MM-DD')

    setValoresActividad({
      fecha_actividad: fecha,
      descripcion: datos[2],
      fk_mantenimiento: datos[3],
      fk_tecnico: tecnicoActividadId
    })
    setSelectIdActividad(datos[0])
    setModalActividadUpdate(true)
  }
  const valorInput = (event) => {
    setValores({
      ...valores,
      [event.target.name]: event.target.value
    })
  }
  const valorInputActividad = (event) => {
    setValoresActividad({
      ...valoresActividad,
      [event.target.name]: event.target.value
    })
  }
  const editValorInput = (event) => {
    setValores(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }
  const editValorInputActividad = (event) => {
    setValoresActividad(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }
  const valorInputTecnico = (event) => {
    setValoresTecnico({
      ...valoresTecnico,
      [event.target.name]: event.target.value
    })
  }
  const editValorInputTecnico = (event) => {
    setValoresTecnico(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }
  const postMantenimiento = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpointMantenimiento, valores, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearForm();
      getMantenimientos();
      getMantenimientosUnidad();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error);
    }
  }
  const putMantenimiento = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointMantenimiento}/${selectId}`, valores, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearForm();
      getMantenimientos();
      getMantenimientosUnidad();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error);
    }
  }
  const postActivity = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpointActividad, valoresActividad, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearFormActivity();
      getActividades();
      getActividadesUnidad();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error);
    }
  }
  const putActivity = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointActividad}/${selectIdActividad}`, valoresActividad, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearFormActivity();
      getActividades();
      getActividadesUnidad();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg);
      console.log(error);
    }
  }
  const postTecnico = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpointTecnico, valoresTecnico, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearFormTecnico();
      getTecnicos();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg);
      console.log(error);
    }
  }
  const putTecnico = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointTecnico}/${selectIdTecnico}`, valoresTecnico, {
        headers: {
          "token": token
        }
      })
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearFormTecnico();
      getTecnicos();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg);
      console.log(error);
    }
  }
  const columnas = [
    {
      name: "id_mantenimiento",
      label: "ID"
    },
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
      name: "descripcion",
      label: "DESCRIPCION"
    },
    {
      name: "usuario",
      label: "RESPONSABLE"
    },
    {
      name: "nombre_equipo",
      label: "EQUIPO"
    },
    {
      name: "editar",
      label: "EDITAR",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonEdit titulo="Actualizar" icon={<HiMiniPencilSquare />} funcion1={() => getData(tableMeta.rowData)} />
          )
        }
      }
    },
    {
      name: "editar",
      label: "ACTIVIDADES",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <div className="btns-edit">
                <ButtonEdit titulo="Registrar Actividad" icon={<FaSquarePlus />} funcion1={() => getIdMantenimiento(tableMeta.rowData)} />
                <IoEyeSharp title="Ver actividades" className="icon-activity" onClick={() => getActividadesMantenimiento(tableMeta.rowData[0])} />
              </div>
            </>
          )
        }
      }
    }
  ]
  const columnasTecnicos = [
    {
      name: "id_tecnico",
      label: "ID"
    },
    {
      name: "identificacion",
      label: "IDENTIFICACIÓN"
    },
    {
      name: "nombres",
      label: "NOMBRES"
    },
    {
      name: "apellidos",
      label: "APELLIDOS"
    },
    {
      name: "correo",
      label: "EMAIL"
    },
    {
      name: "telefono",
      label: "TELÉFONO"
    },
    {
      name: "editar",
      label: "ACTIONS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonEdit icon={<HiMiniPencilSquare />} funcion1={() => getDataTecnico(tableMeta.rowData)} />
          )
        }
      }
    }
  ]
  const columnasActividad = [
    {
      name: "id_actividad",
      label: "ID"
    },
    {
      name: "fecha_actividad",
      label: "FECHA",
      options: {
        customBodyRender: (value) => {
          const fecha = moment(value).format('YYYY-MM-DD');
          return fecha;
        }
      }
    },
    {
      name: "descripcion",
      label: "DESCRIPCION"
    },
    {
      name: "fk_mantenimiento",
      label: "MANTENIMIENTO"
    },
    {
      name: "nombre_tecnico",
      label: "TECNICO"
    },
    {
      name: "nombre_equipo",
      label: "EQUIPO"
    },
    {
      name: "responsable",
      label: "RESPONSABLE"
    },
    {
      name: "editar",
      label: "ACTIONS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonEdit icon={<HiMiniPencilSquare />} funcion1={() => getDataActividad(tableMeta.rowData)} />
          )
        }
      }
    }
  ]
  const columnasActidadesMantenimiento = [
    {
      name: "id_actividad",
      label: "ID"
    },
    {
      name: "descripcion",
      label: "DESCRIPCIÓN"
    },
    {
      name: "fecha_actividad",
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
      label: "TÉCNICO"
    },
    {
      name: "apellidos",
      label: "APELIIDOS"
    }
  ]

  useEffect(() => {
    getMantenimientos();
    getMantenimientosUnidad();
    getEquipos();
    getEquiposUnidad();
    getUsers();
    getTecnicos();
    getActividades();
    getActividadesUnidad();
  }, [])
  //#endregion funciones
  return (
    <Container>
      <Contenedor>
        <HeaderPageMante icon={<GoTools />}
          titulo="MANTENIMIENTOS Y ACTIVIDADES"
          textButton1="REGISTRAR MANTENIMIENTO"
          textButton2="REGISTRAR TÉCNICO"
          funcion1={() => getIdUser()}
          funcion2={() => setModalTecnico(true)}
          identificador="#actividades"
        />
        <BasicTabs
          text1="Mantenimientos"
          text2="Actividades"
          text3="Técnicos" >

          <div className="table-mui" value={0}>
            {
              user && user === "1" ? (
                <MUIDataTable className="table"
                  title = "Lista de Mantenimientos"
                  data={mantenimientos}
                  columns={columnas}
                  options={options}
                />
              ) : (
                <MUIDataTable className="table"
                title= "Lista de Mantenimientos"
                  data={mantenimientosUnit}
                  columns={columnas}
                  options={options}
                />
              )
            }
          </div>
          <div className="table-mui" value={1}>
            {
              user && user === "1" ? (
                <MUIDataTable className="table"
                title = "Lista de Actividades"
                  data={actividades}
                  columns={columnasActividad}
                  options={options}
                />
              ) : (
                <MUIDataTable className="table"
                title = "Lista de Actividades"
                  data={actividadesUnit}
                  columns={columnasActividad}
                  options={options}
                />
              )
            }
          </div>
          <div className="table-mui" value={2}>

            <MUIDataTable className="table"
              title= "Lista de Técnicos"
              data={tecnicos}
              columns={columnasTecnicos}
              options={optionsMedium}
            />
          </div>
        </BasicTabs>
        <Modales>
          <Modal
            titulo="REGISTRAR MANTENIMIENTO"
            estado={modal}
            cambiarEstado={clearForm}
          >
            <form className="formulario" onSubmit={postMantenimiento}>
              <div className="inputs-data">
                <div className="filas">
                  <ContentInput>
                    <FormControl>
                      <InputLabel>Tipo</InputLabel>
                      <Select label="Tipo" name="tipo_mantenimiento" value={valores.tipo_mantenimiento} onChange={valorInput} required>
                        <MenuItem value="preventivo">Preventivo</MenuItem>
                        <MenuItem value="tecnico">Técnico</MenuItem>
                      </Select>
                    </FormControl>

                  </ContentInput>
                  <ContentInput>
                    <TextField name="fecha_mantenimiento" type="date" value={valores.fecha_mantenimiento} onChange={valorInput} required />

                  </ContentInput>
                  <ContentInput>

                    {
                      user && user === "1" ? (
                        <FormControl>
                          <InputLabel>Equipo</InputLabel>
                          <Select label="Equipo" name="fk_equipo" value={valores.fk_equipo} onChange={valorInput} required>
                            {
                              equipos.map((equipos) => (
                                <MenuItem value={equipos.id_equipo} key={equipos.id_equipo}>{equipos.nombre_equipo}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      ) : (
                        <FormControl>
                          <InputLabel>Equipo</InputLabel>
                          <Select label="Equipo" name="fk_equipo" value={valores.fk_equipo} onChange={valorInput} required>
                            {
                              equiposUnidad.map((equipos) => (
                                <MenuItem value={equipos.id_equipo} key={equipos.id_equipo}>{equipos.nombre_equipo}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      )
                    }
                  </ContentInput>
                  <ContentInput className={`${user === "1" ? '' : 'onlyRead'}`}>

                    {
                      user && user === "2" ? (
                        <div className="inputs-encar">
                          <TextField
                          className="idUnidad"
                            label="ID"
                            name="fk_user_responsable"
                            type="number"
                            value={valores.fk_user_responsable}
                            onChange={valorInput} readOnly
                          />
                          <TextField label="Nombres" value={nombresUser} readOnly />
                        </div>
                      ) : (
                        <FormControl>
                          <InputLabel>Responsable</InputLabel>
                          <Select label="Responsable" name="fk_user_responsable" value={valores.fk_user_responsable} onChange={valorInput} required>
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
                </div>
                <div className="filas">
                    <Textarea
                    className="description"
                      name="descripcion"
                      value={valores.descripcion}
                      onChange={valorInput}
                      disabled={false}
                      minRows={8}
                      size="md"
                      variant="outlined"
                      placeholder="Descripción"
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
              <button>REGISTRAR</button>
            </form>
          </Modal>
          <Modal
            titulo="ACTUALIZAR DATOS"
            estado={modalUpdate}
            cambiarEstado={clearForm}
          >
            <form className="formulario" onSubmit={putMantenimiento}>
              <div className="inputs-data">
                <div className="filas">
                  <ContentInput>
                    <FormControl>
                      <InputLabel>Tipo</InputLabel>
                      <Select label="Tipo" name="tipo_mantenimiento" value={valores.tipo_mantenimiento} onChange={editValorInput} required>
                        <MenuItem value="preventivo">Preventivo</MenuItem>
                        <MenuItem value="tecnico">Técnico</MenuItem>
                      </Select>
                    </FormControl>
                  </ContentInput>
                  <ContentInput>
                    <TextField name="fecha_mantenimiento" type="date" value={valores.fecha_mantenimiento} onChange={editValorInput} required />
                  </ContentInput>
                  <ContentInput>
                    <FormControl>
                      <InputLabel>Equipo</InputLabel>
                      {
                        user && user === "1" ? (
                          <Select label="Equipo" name="fk_equipo" value={valores.fk_equipo} onChange={editValorInput} required>
                            {
                              equipos.map((equipos) => (
                                <MenuItem value={equipos.id_equipo} key={equipos.id_equipo}>{equipos.nombre_equipo}</MenuItem>
                              ))
                            }
                          </Select>
                        ) : (
                          <Select label="Equipo" name="fk_equipo" value={valores.fk_equipo} onChange={editValorInput} required>
                            {
                              equiposUnidad.map((equipos) => (
                                <MenuItem value={equipos.id_equipo} key={equipos.id_equipo}>{equipos.nombre_equipo}</MenuItem>
                              ))
                            }
                          </Select>
                        )
                      }
                    </FormControl>

                  </ContentInput>
                  <ContentInput className={`${user === "1" ? 'contents' : 'onlyRead'}`}>

                    {
                      user && user === "2" ? (
                        <div className="inputs-encar">
                          <TextField label="ID" className="idUnidad" name="fk_user_responsable" type="number" value={valores.fk_user_responsable} onChange={editValorInput} readOnly />
                          <TextField label="Nombres" type="text" value={nombresUser} readOnly />
                        </div>
                      ) : (
                        <FormControl>
                          <InputLabel>Responsable</InputLabel>
                          <Select label="Responsable" name="fk_user_responsable" value={valores.fk_user_responsable} onChange={editValorInput} required>
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
                </div>
                <div className="filas">
                  <Textarea
                  className="description"
                      name="descripcion"
                      value={valores.descripcion}
                      onChange={editValorInput}
                      disabled={false}
                      minRows={10}
                      size="md"
                      variant="outlined"
                      placeholder="Descripción"
                      required /> {
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
            titulo="REGISTRAR ACTIVIDAD"
            estado={modalActividad}
            cambiarEstado={clearFormActivity}
          >
            <form className="formulario" onSubmit={postActivity}>
              <div className="inputs-data">
                <div className="filas">
                  <ContentInput>
                    <TextField value={valoresActividad.fecha_actividad} onChange={valorInputActividad} name="fecha_actividad" type="date" required />
                  </ContentInput>
                  <ContentInput className="input-manteinment">
                    <TextField label="Mantenimiento" name="fk_mantenimiento" value={valoresActividad.fk_mantenimiento}   />
                  </ContentInput>
                  <ContentInput className="contents">
                    <FormControl>
                    <InputLabel>Técnico</InputLabel>
                    <Select label="Técnico" name="fk_tecnico" value={valoresActividad.fk_tecnico} onChange={valorInputActividad} required>
                      
                      {
                        tecnicos.map((tecnicos) => (
                          <MenuItem value={tecnicos.id_tecnico} key={tecnicos.id_tecnico}>{tecnicos.nombres} {tecnicos.apellidos}</MenuItem>
                        ))
                      }
                    </Select>
                    </FormControl>
                  </ContentInput>
                </div>
                <div className="filas">
                    <Textarea 
                    name="descripcion" 
                    value={valoresActividad.descripcion} 
                    onChange={valorInputActividad} 
                    minRows ={9}
                    placeholder="Descripción" required/>
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
            estado={modalActividadUpdate}
            cambiarEstado={clearFormActivity}
          >
            <form className="formulario" onSubmit={putActivity}>
              <div className="inputs-data">
                <div className="filas">
                  <ContentInput className="contents">
                    <TextField name="fecha_actividad" value={valoresActividad.fecha_actividad} onChange={editValorInputActividad} type="date" required />
                  </ContentInput>
                  <ContentInput className="input-manteinment">
                    <TextField label="Mantenimiento" name="fk_mantenimiento" value={valoresActividad.fk_mantenimiento} required />
                  </ContentInput>
                  <ContentInput>
                    <FormControl>
                      <InputLabel>Técnico</InputLabel>
                      <Select label="Técnico" name="fk_tecnico" value={valoresActividad.fk_tecnico} onChange={editValorInputActividad} required>
                     
                      {
                        tecnicos.map((tecnicos) => (
                          <MenuItem value={tecnicos.id_tecnico} key={tecnicos.id_tecnico}>{tecnicos.nombres} {tecnicos.apellidos}</MenuItem>
                        ))
                      }
                    </Select>
                    </FormControl>
                    
                  </ContentInput>
                </div>
                <div className="filas">
                    <Textarea
                     name="descripcion" 
                    value={valoresActividad.descripcion} 
                    onChange={editValorInputActividad} 
                    minRows= {9}
                    placeholder="Ingresa una descripción" required/>
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
            titulo="REGISTRAR TÉCNICO"
            estado={modalTecnico}
            cambiarEstado={clearFormTecnico}
          >
            <form className="formulario" onSubmit={postTecnico}>
              <div className="inputs-data-tecnico">
                <div className="filas">
                  <ContentInput>
                    <TextField name="identificacion" value={valoresTecnico.identificacion} onChange={valorInputTecnico} type="number" label="Identificación" required />
                    {
                      errores && errores.some(([campo]) => campo === "identificacion") && (
                        <p>
                          {errores.find(([campo]) => campo === "identificacion")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="nombres" value={valoresTecnico.nombres} onChange={valorInputTecnico} type="text" label="Nombres" required />
                    {
                      errores && errores.some(([campo]) => campo === "nombres") && (
                        <p>
                          {errores.find(([campo]) => campo === "nombres")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="apellidos" value={valoresTecnico.apellidos} onChange={valorInputTecnico} type="text" label="Ingrese Apellidos" required />
                    {
                      errores && errores.some(([campo]) => campo === "apellidos") && (
                        <p>
                          {errores.find(([campo]) => campo === "apellidos")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="correo" value={valoresTecnico.correo} onChange={valorInputTecnico} type="email" label="Ingrese un Correo" required />
                    {
                      errores && errores.some(([campo]) => campo === "correo") && (
                        <p>
                          {errores.find(([campo]) => campo === "correo")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField name="telefono" value={valoresTecnico.telefono} onChange={valorInputTecnico} type="number" label="Teléfono" required />
                    {
                      errores && errores.some(([campo]) => campo === "telefono") && (
                        <p>
                          {errores.find(([campo]) => campo === "telefono")[1]}
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
            titulo="ACTUALIZAR DATOS"
            estado={modalUpdateTecnico}
            cambiarEstado={clearFormTecnico}
          >
            <form className="formulario" onSubmit={putTecnico}>
              <div className="inputs-data-tecnico">
                <div className="filas">
                  <ContentInput>
                    <TextField label="Identificación" name="identificacion" value={valoresTecnico.identificacion} onChange={editValorInputTecnico} type="number" required />
                    {
                      errores && errores.some(([campo]) => campo === "identificacion") && (
                        <p>
                          {errores.find(([campo]) => campo === "identificacion")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput >
                    <TextField label="Nombres" name="nombres" value={valoresTecnico.nombres} onChange={editValorInputTecnico} type="text"  required />
                    {
                      errores && errores.some(([campo]) => campo === "nombres") && (
                        <p>
                          {errores.find(([campo]) => campo === "nombres")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField label="Apellidos" name="apellidos" value={valoresTecnico.apellidos} onChange={editValorInputTecnico} type="text" required />
                    {
                      errores && errores.some(([campo]) => campo === "apellidos") && (
                        <p>
                          {errores.find(([campo]) => campo === "apellidos")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField label="Email" name="correo" value={valoresTecnico.correo} onChange={editValorInputTecnico} type="email" required />
                    {
                      errores && errores.some(([campo]) => campo === "correo") && (
                        <p>
                          {errores.find(([campo]) => campo === "correo")[1]}
                        </p>
                      )
                    }
                  </ContentInput>
                  <ContentInput>
                    <TextField label="Teléfono" name="telefono" value={valoresTecnico.telefono} onChange={editValorInputTecnico} type="number" required />
                    {
                      errores && errores.some(([campo]) => campo === "telefono") && (
                        <p>
                          {errores.find(([campo]) => campo === "telefono")[1]}
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
        <TableModal
          estado={modalTable}
          cambiarEstado={() => setModalTable(false)}
          columnas={columnasActidadesMantenimiento}
          datos={actividadesMantenimiento}
        />
      </Contenedor>
    </Container>
  )
}
export default Mantenimientos