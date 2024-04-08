import styled from "styled-components"
import HeaderPage from "../components/organismos/HeaderPage";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useEffect, useState } from "react";
import { options } from "../components/styles/Table";
import Modal from "../components/modals/Modal";
import ButtonEdit from "../components/organismos/ButtonEdit";
import moment from "moment";
import { GoTools } from "react-icons/go";
import { Alert } from "@mui/material";
import { Contenedor } from "../components/styles/StylesPages";
import { AlertSucces, AlertError } from "../components/alerts/Alerts";

function Mantenimientos() {
//#region funciones
  const endpointManteni = "http://localhost:3000/mantenimientos"
  const endpointUser = "http://localhost:3000/usuarios"
  const endpointEquipo = "http://localhost:3000/equipos"
  const endpointActividad = "http://localhost:3000/actividades"
  const endpointTecnico = "http://localhost:3000/tecnicos"

  const [mantenimientos, setMantenimientos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [equipos, setEquipos] = useState([])
  const [tecnicos, setTecnicos] = useState([])
  const [modal, setModal] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalActividad, setModalActividad] = useState(false)
  const [selectId, setSelectId] = useState(null)
  const [errores, setErrores] = useState("")

  const getMantenimientos = async () => {
    try {
      await axios.get(endpointManteni).then((response) => {
        const manteinments = response.data;
        setMantenimientos(manteinments);
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
   const clearFormActivity = () => {
    setValoresActividad({
      fecha_actividad: "",
      descripcion: "",
      fk_mantenimiento: "",
      fk_tecnico: ""
    })
    setErrores("")
    setModalActividad(false)
   }
   const getData = (datos) => {

    const equipoManteinment = equipos.find(equipment => equipment.nombre_equipo === datos[5]);
    const equipoManteinmentId = equipoManteinment ? equipoManteinment.id_equipo: "";

    const userResponsable = usuarios.find(user => user.nombres === datos[4]);
    const userResponsableId = userResponsable ? userResponsable.id_usuario : "";
    
    const fecha = moment(datos[2]).format('YYYY-MM-DD');
    console.log(datos);
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
   const postMantenimiento = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpointManteni, valores)
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
      }
      clearForm();
      getMantenimientos();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error);
    }
   }
   const putMantenimiento = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointManteni}/${selectId}`, valores)
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
         AlertSucces(msg);
      }
      clearForm();
      getMantenimientos();
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
      console.log(error);
    }
   }
   const postActivity = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(endpointActividad, valoresActividad)
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
         AlertSucces(msg);
      }
      clearFormActivity()
    } catch (error) {
      AlertError();
      setErrores(error.response.data.msg)
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
            <ButtonEdit titulo="EDIT" funcion1={() => getData(tableMeta.rowData)} />
          )
        }
      }
    },
    {
      name: "editar",
      label: "ACTIVIDAD",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonEdit titulo="REGISTRAR ACTIVIDAD" funcion1={() => getIdMantenimiento(tableMeta.rowData)} />
          )
        }
      }
    }
   ]

    useEffect(()=> {
      getMantenimientos();
      getEquipos();
      getUsers();
      getTecnicos();
    },[])
//#endregion funciones
  return (
    <Container>
      <Contenedor>
      <HeaderPage icon={<GoTools/>} titulo="MANTENIMIENTOS" textButton="REGISTRAR MANTENIMIENTO" funcion={() => setModal(true)}/>
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
                  <select name="fk_equipo" value={valores.fk_equipo} onChange={valorInput} required>
                    <option value="">Selecciona una opción</option>
                    {
                      equipos.map((equipos) => (
                        <option value={equipos.id_equipo} key={equipos.id_equipo}>{equipos.nombre_equipo}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="contents">
                  <label>Responsable:</label>
                  <select name="fk_user_responsable" value={valores.fk_user_responsable} onChange={valorInput} required>
                    <option value="">Selecciona una opción</option>
                    {
                      usuarios.map((usuarios) => (
                        <option value={usuarios.id_usuario} key={usuarios.id_usuario}>{usuarios.nombres} {usuarios.apellidos}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="filas">
              <div className="contents">
                <label>Descripción:</label>
                <textarea name="descripcion" value={valores.descripcion} onChange={valorInput} maxLength={250} placeholder="Ingresa una descripción" required/>
                {
                  errores && errores.some(([campo]) => campo === "descripcion") && (
                    <Alert severity="error" icon={false}>
                      {errores.find(([campo]) => campo === "descripcion")[1]}
                    </Alert>
                  )
                }
              </div>
              <div className="contents">
                <label>Resultado:</label>
                <input name="resultado" type="text" value={valores.resultado} onChange={valorInput} placeholder="Resultado" required/>
                {
                  errores && errores.some(([campo]) => campo === "resultado") && (
                    <Alert severity="error" icon={false}>
                      {errores.find(([campo]) => campo === "resultado")[1]}
                    </Alert>
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
                  <select name="fk_equipo" value={valores.fk_equipo} onChange={editValorInput} required>
                    <option value="">Selecciona una opción</option>
                    {
                      equipos.map((equipos) => (
                        <option value={equipos.id_equipo} key={equipos.id_equipo}>{equipos.nombre_equipo}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="contents">
                  <label>Responsable:</label>
                  <select name="fk_user_responsable" value={valores.fk_user_responsable} onChange={editValorInput} required>
                    <option value="">Selecciona una opción</option>
                    {
                      usuarios.map((usuarios) => (
                        <option value={usuarios.id_usuario} key={usuarios.id_usuario}>{usuarios.nombres} {usuarios.apellidos}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="filas">
              <div className="contents">
                <label>Descripción:</label>
                <textarea name="descripcion" value={valores.descripcion} onChange={editValorInput} maxLength={250} placeholder="Ingresa una descripción" required/>
                {
                  errores && errores.some(([campo]) => campo === "descripcion") && (
                    <Alert severity="error" icon={false}>
                      {errores.find(([campo]) => campo === "descripcion")[1]}
                    </Alert>
                  )
                }
              </div>
              <div className="contents">
                <label>Resultado:</label>
                <input name="resultado" type="text" value={valores.resultado} onChange={editValorInput} placeholder="Resultado" required/>
                {
                  errores && errores.some(([campo]) => campo === "resultado") && (
                    <Alert severity="error" icon={false}>
                      {errores.find(([campo]) => campo === "resultado")[1]}
                    </Alert>
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
                 <input name="fk_mantenimiento" value={valoresActividad.fk_mantenimiento}  onChange={valorInputActividad}/>
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
              <div className="contents">
                  <label>Descripción</label>
                  <textarea name="descripcion" value={valoresActividad.descripcion} onChange={valorInputActividad} maxLength={250} placeholder="Ingresa una descripción" required></textarea>
                </div>
                {
                  errores && errores.some(([campo]) => campo === "descripcion") && (
                    <Alert severity="error" icon={false}>
                      {errores.find(([campo]) => campo === "descripcion")[1]}
                    </Alert>
                  )
                }
              </div>
            </div>
            <button>REGISTRAR</button>
          </form>
        </Modal>
      </Modales>
      <div className="table-mui">
        <MUIDataTable className="table"
        title="Lista de Mantenimientos"
       data={mantenimientos}
       columns={columnas}
       options={options}
        />
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
      display: flex;
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

      input{
        padding: 5px;
        min-width: 180px;
        border: none;
        outline: none;
        border-bottom: 1px solid #38a800;
      }
      select{
        padding: 4px;
        min-width: 210px;
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
export default Mantenimientos