import styled from "styled-components"
import NavBar from "../components/organismos/NavBar";
import MUIDataTable from "mui-datatables";
import HeaderPage from "../components/organismos/HeaderPage";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "../components/modals/Modal";
import { options } from "../styles/Styles";
import ButtonEdit from "../components/organismos/ButtonEdit";
import { FiUsers } from "react-icons/fi";

function Usuarios() {

  const [modalRegistro, setModalRegistro] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [selectId, setSelectId] = useState(null)

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
  console.log(datos);
  setValores({
    identificacion: datos[1],
    nombres: datos[2],
    apellidos: datos[3],
    email: datos[4],
    estado: datos[5],
    fk_tipo_usuario: datos[6],
    fk_unidad_productiva: datos[7],
    telefono: datos[8]
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
    const respuesta = await axios.post(endpointUser, valores)
    if (respuesta.status === 200) {
      alert (respuesta.data.message);
    }
    clearForm();
    getUsers();
  } catch (error) {
    console.log(error);
  }
}

const putUsuario = async (event) => {
  event.preventDefault();
  try {
    const respuesta = await axios.put(`${endpointUser}/${selectId}`, valores)
    if (respuesta.status === 200) {
      alert(respuesta.data.message)
    }
    clearForm();
    getUsers();
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
     name: "estado",
     label: "ESTADO"
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
    name: "editar",
    label: "ACTIONS",
    options:{
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <ButtonEdit funcion1={() => getData(tableMeta.rowData)} />
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
      <NavBar/>
      <div className="contenedor">
     <HeaderPage icon={<FiUsers/>} titulo="USUARIOS" textButton="REGISTRAR USUARIO" funcion={() => setModalRegistro(true)} />
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
              </div>
              <div className="contents">
              <label>Nombres: </label>
              <input name="nombres" onChange={valorInput} value={valores.nombres} type="text" placeholder="Nombres" required/>
              </div>
              <div className="contents">
              <label>Apellidos: </label>
              <input name="apellidos" onChange={valorInput} value={valores.apellidos} type="text" placeholder="Apellidos" required/>
              </div>
              <div className="contents">
              <label>Email: </label>
              <input name="email" onChange={valorInput} value={valores.email} type="email" placeholder="Email" required/>
              </div>
              <div className="contents">
              <label>Teléfono: </label>
              <input name="telefono" onChange={valorInput} value={valores.telefono} type="number" placeholder="Teléfono" required/>
              </div>
              </div>
            <div className="filas">
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
            <div className="contents">
            <label>Contraseña: </label>
            <input name="password" onChange={valorInput} value={valores.password} type="password" placeholder="Contraseña" required/>
              </div>
              <div className="contents">
              <label>Confirmar Contraseña: </label>
              <input type="password" placeholder="Confirmar Contraseña" required/>
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
              </div>
              <div className="contents">
              <label>Nombres: </label>
              <input name="nombres" onChange={editValorInput} value={valores.nombres} type="text" placeholder="Nombres" required/>
              </div>
              <div className="contents">
              <label>Apellidos: </label>
              <input name="apellidos" onChange={editValorInput} value={valores.apellidos} type="text" placeholder="Apellidos" required/>
              </div>
              <div className="contents">
              <label>Email: </label>
              <input name="email" onChange={editValorInput} value={valores.email} type="email" placeholder="Email" required/>
              </div>
              </div>
            <div className="filas">
            <div className="contents">
              <label>Teléfono: </label>
              <input name="telefono" onChange={editValorInput} value={valores.telefono} type="number" placeholder="Teléfono" required/>
              </div>
            <div className="contents">
             <label>Rol del Usuario: </label>
             <select name="fk_tipo_usuario" onChange={editValorInput} value={valores.fk_tipo_usuario}>
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
           <select name="estado" onChange={editValorInput} value={valores.estado}>
                <option value="">Seleccione un estado</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
                </div>
             <div className="contents">
             <label>Unidad Productiva: </label>
             <select name="fk_unidad_productiva" onChange={editValorInput} value={valores.fk_unidad_productiva}>
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
      grid-template-columns: 200px 230px;
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