import styled from "styled-components"
import MUIDataTable from "mui-datatables";
import HeaderPage from "../components/organismos/HeaderPage";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "../components/modals/Modal";
import { options } from "../components/styles/Table";
import ButtonEdit from "../components/organismos/ButtonEdit";
import { FiUsers } from "react-icons/fi";
import { Contenedor } from "../components/styles/StylesPages"
import { AlertSucces, AlertError, AlertConfirmation } from "../components/alerts/Alerts";
import ButtonStatus from "../components/organismos/ButtonStatus";
import { PiUserCirclePlus } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";

function Usuarios() {

  const [modalRegistro, setModalRegistro] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [selectId, setSelectId] = useState(null)
  const [errores, setErrores] = useState("")

  const token= localStorage.getItem("token");

  const endpointTipo = "http://localhost:3000/tipousuario"
  const [tipousuario, setTipousuario] = useState([])
  const getTipos = async () => {
    try {
      await axios.get(endpointTipo).then((response) => {
        const tipos = response.data;
        setTipousuario(tipos);
      })
    } catch (error) {
      console.log(error);
    }
  }

//#region unidades
  const endpointUnit = "http://localhost:3000/unidades"
  const [unidades, setUnidades] = useState([])
  const getUnidades = async () => {
    try {
      await axios.get(endpointUnit).then((response) => {
        const units = response.data;
        setUnidades(units);
      })
    } catch (error) {
      console.log(error);
    }
  }
//#endregion unidades
//#region registro
const [valores, setValores] = useState({
  identificacion: "",
  nombres: "",
  apellidos: "",
  email: "",
  telefono: "",
  estado: "",
  fk_tipo_usuario: "",
  fk_unidad_productiva: "",
  password: ""
})

const clearForm = () => {
  setValores({
    identificacion: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    estado: "",
    fk_tipo_usuario: "",
    fk_unidad_productiva: "",
    password: ""
  })
  setErrores("")
  setSelectId(null);
  setModalRegistro(false);
  setModalUpdate(false);
}
const valorInput = (event) => {
  setValores({
    ...valores,
     [event.target.name] : event.target.value
  })
}
const getData = (datos) => {

    // Obtener el ID del tipo de usuario
    const tipoUsuario = tipousuario.find(tipo => tipo.rol === datos[5]);
    const tipoUsuarioId = tipoUsuario ? tipoUsuario.id_tipo_usuario : "";

    // Obtener el ID de la unidad productiva
    const unidad = unidades.find(unidad => unidad.nombre_unidad === datos[6]);
    const unidadId = unidad ? unidad.id_unidad : "";

  setValores({
    identificacion: datos[1],
    nombres: datos[2],
    apellidos: datos[3],
    email: datos[4],
    estado: datos[8],
    fk_tipo_usuario: tipoUsuarioId,
    fk_unidad_productiva: unidadId,
    telefono: datos[7]
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

const postUser = async (event) => {
  event.preventDefault();
  try {
    //establecer contraseña por default
    const defaultPassword = {
      ...valores,
      password: valores.identificacion
    };

    const respuesta = await axios.post(endpointUser, defaultPassword, {
      headers: {
        "token": token
      }
    })
    if (respuesta.status === 200) {
      const msg = respuesta.data.message;
      AlertSucces(msg);
    }
    clearForm();
    getUsers();
  } catch (error) {
    AlertError();
    setErrores(error.response.data.msg);
    console.log(error);
  }
}

const putUsuario = async (event) => {
  event.preventDefault();
  try {
    const respuesta = await axios.put(`${endpointUser}/${selectId}`, valores, {
      headers: {
        "token": token
      }
    })
    if (respuesta.status === 200) {
      const msg = respuesta.data.message;
      AlertSucces(msg);
    }
    clearForm();
    getUsers();
  } catch (error) {
    AlertError();
    setErrores(error.response.data.msg);
    console.log(error);
  }
}

const changeStatus = async (datos) => {
  try {
    const id_usuario = datos[0];
    const estadoUser = datos[8];
    // Determinar el nuevo estado
    const nuevoEstado = estadoUser === "activo" ? "inactivo" : "activo";
    
    const respuesta = await axios.put(`${endpointUser}/estado/${id_usuario}`, {
      estado: nuevoEstado
    });
    
    if (respuesta.status === 200) {
      // Busca el usuario por ID en la lista de usuarios y actualiza su estado
      const updatedUsers = usuarios.map((usuario) => {
        if (usuario.id_usuario === id_usuario) {
          return {
            ...usuario,
            estado: nuevoEstado
          };
        }
        // Retorna el usuario sin cambios si no es el usuario con el id al que queremos cambiar el estado
        return usuario; 
      });
  
      setUsuarios(updatedUsers);
      AlertSucces(respuesta.data.message)
    }
  } catch (error) {
    console.log(error);
  }
}



//#endregion registro
 //#region table
 const endpointUser = "http://localhost:3000/usuarios" 
 const [usuarios, setUsuarios] = useState([])

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

 const columnas = [
   {
     name: "id_usuario",
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
     name: "email",
     label: "EMAIL"
   },
   {
     name: "rol",
     label: "ROL"
   },
   {
     name: "nombre_unidad",
     label: "UNIDAD"
   },
   {
    name: "telefono",
    label: "TELEFONO"
   },
   {
    name: "estado",
    label: "ESTADO",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          // <ButtonStatus text={tableMeta.rowData[8]} funcion={() => changeStatus(tableMeta.rowData)}/>
          <ButtonStatus text={tableMeta.rowData[8]} funcion={() => AlertConfirmation(() => changeStatus(tableMeta.rowData))}/>
        )
      }
    }
  },
   {
    name: "editar",
    label: "ACTIONS",
    options:{
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <ButtonEdit icon={<RiUserSettingsLine />} funcion1={() => getData(tableMeta.rowData)} />
        )
      }
    }
   }
 ];
 
 //#endregion table

 useEffect(() => {
  getUsers();
  getUnidades();
  getTipos();
}, [])

  return (
    <Container>
      <Contenedor>
     <HeaderPage icon={<FiUsers/>} titulo="USUARIOS" iconButton={<PiUserCirclePlus />} funcion={() => setModalRegistro(true)} />
      <Modales>
        <Modal 
        titulo = "REGISTRAR USUARIO"
        estado={modalRegistro}
        cambiarEstado={clearForm}
        >
          <form className="formulario" onSubmit={postUser}>
            <div className="inputs-data">
              <div className="filas">
              <div className="contents">
                <label>Identificación: </label>
              <input name="identificacion" onChange={valorInput} value={valores.identificacion} type="number" placeholder="Identificación" required/>
              {
                errores && errores.some(([campo]) => campo === "identificacion") && (
                  <p>
                    {errores.find(([campo]) => campo === "identificacion")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Nombres: </label>
              <input name="nombres" onChange={valorInput} value={valores.nombres} type="text" placeholder="Nombres" required/>
              {
                errores && errores.some(([campo]) => campo === "nombres") && (
                  <p>
                    {errores.find(([campo]) => campo === "nombres")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Apellidos: </label>
              <input name="apellidos" onChange={valorInput} value={valores.apellidos} type="text" placeholder="Apellidos" required/>
              {
                errores && errores.some(([campo]) => campo === "apellidos") && (
                  <p>
                    {errores.find(([campo]) => campo === "apellidos")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Email: </label>
              <input name="email" onChange={valorInput} value={valores.email} type="email" placeholder="Email" required/>
              {
                errores && errores.some(([campo]) => campo === "email") && (
                  <p>
                    {errores.find(([campo]) => campo === "email")[1]}
                  </p>
                )
              }
              </div>
              </div>
            <div className="filas">
            <div className="contents">
              <label>Teléfono: </label>
              <input name="telefono" onChange={valorInput} value={valores.telefono} type="number" placeholder="Teléfono" required/>
              {
                errores && errores.some(([campo]) => campo === "telefono") && (
                  <p>
                    {errores.find(([campo]) => campo === "telefono")[1]}
                  </p>
                )
              }
              </div>
            <div className="contents">
             <label>Rol del Usuario: </label>
             <select name="fk_tipo_usuario" onChange={valorInput} value={valores.fk_tipo_usuario}>
                <option value="">Seleccione un rol</option>
            {
              tipousuario.map((tipousuario) => (
                <option key={tipousuario.id_tipo_usuario} value={tipousuario.id_tipo_usuario}>{tipousuario.rol}</option>
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
              </select>
                </div>
             <div className="contents">
             <label>Unidad Productiva: </label>
             <select name="fk_unidad_productiva" onChange={valorInput} value={valores.fk_unidad_productiva}>
                <option value="">Seleccione unidad productiva</option>
                {
                  unidades.map((unidades) => (
                    <option key={unidades.id_unidad} value={unidades.id_unidad}>{unidades.nombre_unidad}</option>
                  ))
                }
              </select>
                </div>
            </div>
            </div>
            <button>REGISTRAR</button>
          </form>
        </Modal>
        <Modal
        titulo="ACTUALIZAR DATOS"
        estado={modalUpdate}
        cambiarEstado={clearForm} >
        <form className="formulario" onSubmit={putUsuario}>
            <div className="inputs-data">
              <div className="filas">
              <div className="contents">
                <label>Identificación: </label>
              <input name="identificacion" onChange={editValorInput} value={valores.identificacion} type="number" placeholder="Identificación" required/>
              {
                errores && errores.some(([campo]) => campo === "identificacion") && (
                 <p>
                    {errores.find(([campo]) => campo === "identificacion")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Nombres: </label>
              <input name="nombres" onChange={editValorInput} value={valores.nombres} type="text" placeholder="Nombres" required/>
              {
                errores && errores.some(([campo]) => campo === "nombres") && (
                  <p>
                    {errores.find(([campo]) => campo === "nombres")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Apellidos: </label>
              <input name="apellidos" onChange={editValorInput} value={valores.apellidos} type="text" placeholder="Apellidos" required/>
              {
                errores && errores.some(([campo]) => campo === "apellidos") && (
                  <p>
                    {errores.find(([campo]) => campo === "apellidos")[1]}
                  </p>
                )
              }
              </div>
              <div className="contents">
              <label>Email: </label>
              <input name="email" onChange={editValorInput} value={valores.email} type="email" placeholder="Email" required/>
              {
                errores && errores.some(([campo]) => campo === "email") && (
                  <p>
                    {errores.find(([campo]) => campo === "email")[1]}
                  </p>
                )
              }
              </div>
              </div>
            <div className="filas">
            <div className="contents">
              <label>Teléfono: </label>
              <input name="telefono" onChange={editValorInput} value={valores.telefono} type="number" placeholder="Teléfono" required/>
              {
                errores && errores.some(([campo]) => campo === "telefono") && (
                  <p>
                    {errores.find(([campo]) => campo === "telefono")[1]}
                  </p>
                )
              }
              </div>
            <div className="contents">
             <label>Rol del Usuario: </label>
             <select name="fk_tipo_usuario" onChange={editValorInput} value={valores.fk_tipo_usuario} required>
                <option value="">Seleccione un rol</option>
            {
              tipousuario.map((tipousuario) => (
                <option key={tipousuario.id_tipo_usuario} value={tipousuario.id_tipo_usuario}>{tipousuario.rol}</option>
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
              </select>
                </div>
             <div className="contents">
             <label>Unidad Productiva: </label>
             <select name="fk_unidad_productiva" onChange={editValorInput} value={valores.fk_unidad_productiva} required>
                <option value="">Seleccione unidad productiva</option>
                {
                  unidades.map((unidades) => (
                    <option key={unidades.id_unidad} value={unidades.id_unidad}>{unidades.nombre_unidad}</option>
                  ))
                }
              </select>
                </div>
            </div>
            </div>
            <button>ACTUALIZAR</button>
          </form>
        </Modal>
      </Modales>
       <div className="table-mui">
       <MUIDataTable className="table"
        title= "Lista de usuarios"
        data= {usuarios}
        columns= {columnas}
        options= {options}
        >
        </MUIDataTable>
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
      display: grid;
      grid-template-columns: 260px 260px;
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
          height: 70px;
          padding: 5px;
          border-radius: 5px;
          gap: 3px;
          

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
        border: none;
        outline: none;
        border-bottom: 1px solid #38a800;
      }
      select{
        padding: 4px;
        border: none;
        outline: none;
        border-bottom: 1px solid #38a800;
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


export default Usuarios