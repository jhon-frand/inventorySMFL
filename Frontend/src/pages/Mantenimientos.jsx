import styled from "styled-components"
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
import MediumContainer from "../components/organismos/MediumContainer";
import TableModal from "../components/modals/TableModal";
import { PiNotePencilDuotone } from "react-icons/pi";
import { FaSquarePlus } from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";

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
    await axios.get(`http://localhost:3000/actividades/mantenimiento/${id}`).then((response) => {
    const activitiesManten = response.data;
    console.log(activitiesManten);
    setActividadesMantenimiento(activitiesManten);
    setModalTable(true);
    
    
   })
  
  } catch (error) {
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
    resultado: "",
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
      resultado: "",
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
    const equipoManteinmentId = equipoManteinment ? equipoManteinment.id_equipo: "";

    const userResponsable = usuarios.find(user => user.nombres === datos[4]);
    const userResponsableId = userResponsable ? userResponsable.id_usuario : "";
    
    const fecha = moment(datos[2]).format('YYYY-MM-DD');
    setValores({
    tipo_mantenimiento: datos[1],
    fecha_mantenimiento: fecha,
    descripcion: datos[3],
    fk_user_responsable: userResponsableId,
    fk_equipo: equipoManteinmentId,
    resultado: datos[6]
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
    const tecnicoActividadId = tecnicoActividad ? tecnicoActividad.id_tecnico: "";

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
      [event.target.name] : event.target.value 
    })
   }
   const valorInputActividad = (event) => {
    setValoresActividad({
      ...valoresActividad,
      [event.target.name] : event.target.value
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
      [event.target.name] : event.target.value
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
   const columnas =[
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
      name: "resultado",
      label: "RESULTADO"
    },
    {
      name: "editar",
      label: "EDITAR",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonEdit icon={<HiMiniPencilSquare />} funcion1={() => getData(tableMeta.rowData)} />
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
           <ButtonEdit icon={<FaSquarePlus />} funcion1={() => getIdMantenimiento(tableMeta.rowData)} />
            <IoEyeSharp className="icon-activity" onClick={() => getActividadesMantenimiento(tableMeta.rowData[0])}/>
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
          return(
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
          return(
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

    useEffect(()=> {
      getMantenimientos();
      getMantenimientosUnidad();
      getEquipos();
      getEquiposUnidad();
      getUsers();
      getTecnicos();
      getActividades();
      getActividadesUnidad();
      getActividadesMantenimiento();
    },[])
//#endregion funciones
  return (
    <Container>
      <Contenedor>
      <HeaderPageMante icon={<GoTools/>} 
      titulo="MANTENIMIENTOS Y ACTIVIDADES" 
      textButton1="REGISTRAR MANTENIMIENTO" 
      textButton2="REGISTRAR TÉCNICO" 
      textButton3="VER ACTIVIDADES" 
      funcion1={() => getIdUser()}
      funcion2={() => setModalTecnico(true)}
      identificador="#actividades"
      />
      <MediumContainer>
      <MUIDataTable className= "table-medium"
          title="Técnicos"
          data={tecnicos}
          columns={columnasTecnicos}
          options={optionsMedium}
           />
      </MediumContainer>
      <Modales>
        <Modal
        titulo="REGISTRAR MANTENIMIENTO"
        estado={modal}
        cambiarEstado={clearForm}
        >
          <form className="formulario" onSubmit={postMantenimiento}>
            <div className="inputs-data">
              <div className="filas">
                <div className="contents">
                  <label>Tipo de Mantenimiento:</label>
                  <select name="tipo_mantenimiento" value={valores.tipo_mantenimiento} onChange={valorInput} required>
                    <option value="">Selecciona el tipo</option>
                    <option value="preventivo">Preventivo</option>
                    <option value="tecnico">Técnico</option>
                  </select>
                </div>
                <div className="contents">
                  <label>Fecha de Mantenimiento:</label>
                  <input name="fecha_mantenimiento" type="date" value={valores.fecha_mantenimiento} onChange={valorInput} required/>
                </div>
                <div className="contents">
                  <label>Equipo:</label>
                 {
                  user && user === "1" ? (
                    <select name="fk_equipo" value={valores.fk_equipo} onChange={valorInput} required>
                    <option value="">Selecciona una opción</option>
                    {
                      equipos.map((equipos) => (
                        <option value={equipos.id_equipo} key={equipos.id_equipo}>{equipos.nombre_equipo}</option>
                      ))
                    }
                  </select>
                  ):( 
                  <select name="fk_equipo" value={valores.fk_equipo} onChange={valorInput} required>
                  <option value="">Selecciona una opción</option>
                  {
                    equiposUnidad.map((equipos) => (
                      <option value={equipos.id_equipo} key={equipos.id_equipo}>{equipos.nombre_equipo}</option>
                    ))
                  }
                </select>
                )
                 }
                </div>
                <div className={`${user === "1" ? 'contents' : 'onlyRead'}`}>
                  <label>Responsable:</label>
                  {
                    user && user === "2" ? (
                    <div className="inputs-encar">
                      <input 
                      className="idunidad" 
                      name="fk_user_responsable" 
                      type="number" 
                      value={valores.fk_user_responsable} 
                      onChange={valorInput} readOnly
                       />
                      <input className="idnombreUser" value={nombresUser}  readOnly/>
                    </div>
                    ) : (
                      <select name="fk_user_responsable" value={valores.fk_user_responsable} onChange={valorInput} required>
                      <option value="">Selecciona una opción</option>
                      {
                        usuarios.map((usuarios) => (
                          <option value={usuarios.id_usuario} key={usuarios.id_usuario}>{usuarios.nombres} {usuarios.apellidos}</option>
                        ))
                      }
                    </select>
                    )
                  }
                 
                </div>
              </div>
              <div className="filas">
              <div className="description">
                <label>Descripción:</label>
                <textarea name="descripcion" value={valores.descripcion} onChange={valorInput} maxLength={250} placeholder="Ingresa una descripción" required/>
                {
                  errores && errores.some(([campo]) => campo === "descripcion") && (
                    <p>
                      {errores.find(([campo]) => campo === "descripcion")[1]}
                    </p>
                  )
                }
              </div>
              <div className="contents">
                <label>Resultado:</label>
                <input name="resultado" type="text" value={valores.resultado} onChange={valorInput} placeholder="Resultado" required/>
                {
                  errores && errores.some(([campo]) => campo === "resultado") && (
                    <p>
                      {errores.find(([campo]) => campo === "resultado")[1]}
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
        cambiarEstado={clearForm}
        >
          <form className="formulario" onSubmit={putMantenimiento}>
            <div className="inputs-data">
              <div className="filas">
                <div className="contents">
                  <label>Tipo de Mantenimiento:</label>
                  <select name="tipo_mantenimiento" value={valores.tipo_mantenimiento} onChange={editValorInput} required>
                    <option value="">Selecciona el tipo</option>
                    <option value="preventivo">Preventivo</option>
                    <option value="tecnico">Técnico</option>
                  </select>
                </div>
                <div className="contents">
                  <label>Fecha de Mantenimiento:</label>
                  <input name="fecha_mantenimiento" type="date" value={valores.fecha_mantenimiento} onChange={editValorInput} required/>
                </div>
                <div className="contents">
                  <label>Equipo:</label>
                  {
                  user && user === "1" ? (
                    <select name="fk_equipo" value={valores.fk_equipo} onChange={editValorInput} required>
                    <option value="">Selecciona una opción</option>
                    {
                      equipos.map((equipos) => (
                        <option value={equipos.id_equipo} key={equipos.id_equipo}>{equipos.nombre_equipo}</option>
                      ))
                    }
                  </select>
                  ):( 
                  <select name="fk_equipo" value={valores.fk_equipo} onChange={editValorInput} required>
                  <option value="">Selecciona una opción</option>
                  {
                    equiposUnidad.map((equipos) => (
                      <option value={equipos.id_equipo} key={equipos.id_equipo}>{equipos.nombre_equipo}</option>
                    ))
                  }
                </select>
                )
                 }
                </div>
                <div className={`${user === "1" ? 'contents' : 'onlyRead'}`}>
                  <label>Responsable:</label>
                  {
                    user && user === "2" ? (
                      <div className="inputs-encar">
                      <input className="idunidad" name="fk_user_responsable" type="number" value={valores.fk_user_responsable} onChange={editValorInput} readOnly />
                      <input className="idnombreUser" type="text" value={nombresUser}  readOnly/>
                    </div>
                    ) : (
                      <select name="fk_user_responsable" value={valores.fk_user_responsable} onChange={editValorInput} required>
                      <option value="">Selecciona una opción</option>
                      {
                        usuarios.map((usuarios) => (
                          <option value={usuarios.id_usuario} key={usuarios.id_usuario}>{usuarios.nombres} {usuarios.apellidos}</option>
                        ))
                      }
                    </select>
                    )
                  }
                </div>
              </div>
              <div className="filas">
              <div className="description">
                <label>Descripción:</label>
                <textarea name="descripcion" value={valores.descripcion} onChange={editValorInput} maxLength={250} placeholder="Ingresa una descripción" required/>
                {
                  errores && errores.some(([campo]) => campo === "descripcion") && (
                    <p>
                      {errores.find(([campo]) => campo === "descripcion")[1]}
                    </p>
                  )
                }
              </div>
              <div className="contents">
                <label>Resultado:</label>
                <input name="resultado" type="text" value={valores.resultado} onChange={editValorInput} placeholder="Resultado" required/>
                {
                  errores && errores.some(([campo]) => campo === "resultado") && (
                    <p>
                      {errores.find(([campo]) => campo === "resultado")[1]}
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
        titulo="REGISTRAR ACTIVIDAD"
        estado={modalActividad}
        cambiarEstado={clearFormActivity}
        >
          <form className="formulario" onSubmit={postActivity}>
            <div className="inputs-data">
              <div className="filas">
                <div className="contents">
                  <label>Fecha de Actividad:</label>
                  <input value={valoresActividad.fecha_actividad} onChange={valorInputActividad}  name="fecha_actividad" type="date" required />
                </div>
                <div className="input-manteinment">
                  <label>ID Mantenimiento:</label>
                 <input name="fk_mantenimiento" value={valoresActividad.fk_mantenimiento}  onChange={valorInputActividad} readOnly/>
                </div>
                <div className="contents">
                  <label>Técnico:</label>
                  <select name="fk_tecnico" value={valoresActividad.fk_tecnico} onChange={valorInputActividad}  required> 
                  <option value="">selecciona una opción</option>
                 {
                  tecnicos.map((tecnicos) => (
                    <option value={tecnicos.id_tecnico} key={tecnicos.id_tecnico}>{tecnicos.nombres} {tecnicos.apellidos}</option>
                   ) )
                 }
                  </select>
                </div>
              </div>
              <div className="filas">
              <div className="description">
                  <label>Descripción</label>
                  <textarea name="descripcion" value={valoresActividad.descripcion} onChange={valorInputActividad} maxLength={250} placeholder="Ingresa una descripción" required></textarea>
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
        estado={modalActividadUpdate}
        cambiarEstado={clearFormActivity}
        >
          <form className="formulario" onSubmit={putActivity}>
            <div className="inputs-data">
              <div className="filas">
                <div className="contents">
                  <label>Fecha de Actividad:</label>
                  <input name="fecha_actividad" value={valoresActividad.fecha_actividad} onChange={editValorInputActividad} type="date" required />
                </div>
                <div className="input-manteinment">
                  <label>Mantenimiento:</label>
                  <input name="fk_mantenimiento" value={valoresActividad.fk_mantenimiento} onChange={editValorInputActividad} required readOnly/> 
                </div>
                <div className="contents">
                  <label>Técnico:</label>
                  <select name="fk_tecnico" value={valoresActividad.fk_tecnico} onChange={editValorInputActividad} required> 
                  <option value="">selecciona una opción</option>
                  {
                    tecnicos.map((tecnicos) => (
                      <option value={tecnicos.id_tecnico} key={tecnicos.id_tecnico}>{tecnicos.nombres} {tecnicos.apellidos}</option>
                    ))
                  }
                  </select>
                </div>
              </div>
              <div className="filas">
              <div className="description">
                  <label>Descripción</label>
                  <textarea name="descripcion" value={valoresActividad.descripcion} onChange={editValorInputActividad} maxLength={250} placeholder="Ingresa una descripción" required></textarea>
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
        titulo="REGISTRAR TÉCNICO"
        estado={modalTecnico}
        cambiarEstado={clearFormTecnico}
        >
          <form className="formulario" onSubmit={postTecnico}>
            <div className="inputs-data-tecnico">
              <div className="filas">
                <div className="contents">
                  <label>Identificación:</label>
                  <input name="identificacion" value={valoresTecnico.identificacion} onChange={valorInputTecnico} type="number" placeholder="Identificación" required />
                  {
                  errores && errores.some(([campo]) => campo === "identificacion") && (
                    <p>
                      {errores.find(([campo]) => campo === "identificacion")[1]}
                    </p>
                  )
                }
                </div>
                <div className="contents">
                  <label>Nombres:</label>
                  <input name="nombres" value={valoresTecnico.nombres} onChange={valorInputTecnico} type="text" placeholder="Ingrese Nombres" required/>
                  {
                  errores && errores.some(([campo]) => campo === "nombres") && (
                    <p>
                      {errores.find(([campo]) => campo === "nombres")[1]}
                    </p>
                  )
                }
                </div>
                <div className="contents">
                  <label>Apellidos:</label>
                  <input name="apellidos" value={valoresTecnico.apellidos} onChange={valorInputTecnico} type="text" placeholder="Ingrese Apellidos" required/>
                  {
                  errores && errores.some(([campo]) => campo === "apellidos") && (
                    <p>
                      {errores.find(([campo]) => campo === "apellidos")[1]}
                    </p>
                  )
                }
                </div>
                <div className="contents">
                  <label>Correo:</label>
                  <input name="correo" value={valoresTecnico.correo} onChange={valorInputTecnico} type="email" placeholder="Ingrese un Correo" required/>
                  {
                  errores && errores.some(([campo]) => campo === "correo") && (
                    <p>
                      {errores.find(([campo]) => campo === "correo")[1]}
                    </p>
                  )
                }
                </div>
                <div className="contents">
                  <label>Teléfono:</label>
                  <input name="telefono" value={valoresTecnico.telefono} onChange={valorInputTecnico} type="number" placeholder="Teléfono" required/>
                  {
                  errores && errores.some(([campo]) => campo === "telefono") && (
                    <p>
                      {errores.find(([campo]) => campo === "telefono")[1]}
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
        estado={modalUpdateTecnico}
        cambiarEstado={clearFormTecnico}
        >
          <form className="formulario" onSubmit={putTecnico}>
            <div className="inputs-data-tecnico">
              <div className="filas">
                <div className="contents">
                  <label>Identificación:</label>
                  <input name="identificacion" value={valoresTecnico.identificacion} onChange={editValorInputTecnico} type="number" placeholder="Identificación" required />
                {
                  errores && errores.some(([campo]) => campo === "identificacion") && (
                    <p>
                      {errores.find(([campo]) => campo === "identificacion")[1]}
                    </p>
                  )
                }
                </div>
                <div className="contents">
                  <label>Nombres:</label>
                  <input name="nombres" value={valoresTecnico.nombres} onChange={editValorInputTecnico} type="text" placeholder="Ingrese Nombres" required/>
                  {
                  errores && errores.some(([campo]) => campo === "nombres") && (
                    <p>
                      {errores.find(([campo]) => campo === "nombres")[1]}
                    </p>
                  )
                }
                </div>
                <div className="contents">
                  <label>Apellidos:</label>
                  <input name="apellidos" value={valoresTecnico.apellidos} onChange={editValorInputTecnico} type="text" placeholder="Ingrese Apellidos" required/>
                  {
                  errores && errores.some(([campo]) => campo === "apellidos") && (
                    <p>
                      {errores.find(([campo]) => campo === "apellidos")[1]}
                    </p>
                  )
                }
                </div>
                <div className="contents">
                  <label>Correo:</label>
                  <input name="correo" value={valoresTecnico.correo} onChange={editValorInputTecnico} type="email" placeholder="Ingrese un Correo" required/>
                  {
                  errores && errores.some(([campo]) => campo === "correo") && (
                    <p>
                      {errores.find(([campo]) => campo === "correo")[1]}
                    </p>
                  )
                }
                </div>
                <div className="contents">
                  <label>Teléfono:</label>
                  <input name="telefono" value={valoresTecnico.telefono} onChange={editValorInputTecnico} type="number" placeholder="Teléfono" required/>
                  {
                  errores && errores.some(([campo]) => campo === "telefono") && (
                    <p>
                      {errores.find(([campo]) => campo === "telefono")[1]}
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
            title="Lista de Mantenimientos"
           data={mantenimientos}
           columns={columnas}
           options={options}
            />
          ):(
            <MUIDataTable className="table"
            title="Lista de Mantenimientos"
           data={mantenimientosUnit}
           columns={columnas}
           options={options}
            />
          )
        }
       
      </div>
      <TableModal
      estado={modalTable}
      cambiarEstado={() => setModalTable(false)}
      columnas={columnasActidadesMantenimiento}
      datos={actividadesMantenimiento}
      />
      </Contenedor>
      <Contenedor>
      <div className="table-mui" id="actividades">
       {
        user && user === "1" ? (
          <MUIDataTable className="table" 
          title="Lista de Actividades"
          data={actividades}
          columns={columnasActividad}
          options={options}
          />
        ): (
          <MUIDataTable className="table" 
          title="Lista de Actividades"
          data={actividadesUnit}
          columns={columnasActividad}
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

.table-medium{
    width: 90%;

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

  .icon-activity{
    font-size: 30px;
    color: orange;
    cursor: pointer;

    &:hover{
      color: #38A800;
    }
  }

  .table{
     width: 90%;

     th{
      background: #38A800;
      color: white;
      padding: 10px;
     }

     .btns-edit{
      display: flex;
      justify-content: center;
      gap: 10px;
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

  .inputs-data-tecnico{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #38a80030;
    width: 100%;
    border-radius: 20px;
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


      .input-manteinment{
        display: flex;
        flex-direction: column;
        padding: 5px;
        border-radius: 5px;
        gap: 10px;
        background: #90b8b0;

        input{
          background: #90b8b0;
        }
      }

      select{
        padding: 4px;
        min-width: 210px;
        border: none;
        outline: none;
        border-bottom: 1px solid #38a800;
      }
      textarea{
        width: 270px;
        height: 170px;
        border: none;
        outline: none;
        resize: none;
        border-bottom: 1px solid #38a800;
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
          padding: 5px;
          height: 230px;
          border-radius: 5px;
          gap: 10px;

          p{
            font-size: 12px;
            color: red;
          }

          label{
            font-size: 14px;
            font-weight: 600;
          }
        }
        .onlyRead{
          background: #38a80067;

          input{
            font-weight: bold;
          }
        }
        .contents{
          background: white;
        }

        .contents, .onlyRead{
          display: flex;
          flex-direction: column;
          padding: 4px;
          width: 280px;
          height: 70px;
          border-radius: 5px;
          gap: 4px;

          p{
            font-size: 12px;
            color: red;
          }

          label{
            font-size: 14px;
            font-weight: 600;
          }
        }
  
      }

      input{
        padding: 5px;
        min-width: 40px;
        background: none;
        border: none;
        outline: none;
        border-bottom: 1px solid #38a800;
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
.inputs-encar{
    display: flex;
    
  .idnombreUser{
  width: 100%;
  }
    .idunidad {
      width: 40px;
    }
  }
}

`;
export default Mantenimientos