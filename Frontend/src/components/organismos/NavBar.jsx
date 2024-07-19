import styled from "styled-components"
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../modals/Modal"
import { TextField } from "@mui/material";
import axios from "axios";
import { endpointUser } from "../endpoints/Endpoints";
import { AlertSucces, AlertError } from "../alerts/Alerts";
import ContentInput from "./ContentInput";
import { useRef } from 'react';
import { IoLockClosed } from "react-icons/io5";
import { RiUserSettingsFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

function NavBar() {

  const [modal, setModal] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const user = localStorage.getItem("user");
  const [name, setName] = useState(localStorage.getItem("nombres"));
  const idUser = localStorage.getItem("usuario");
  const unidad = localStorage.getItem("unidad");
  const token = localStorage.getItem("token");
  const [menu, setMenu] = useState(false);
  const [errores, setErrores] = useState("");
  const menuRef = useRef(null);

  const [valores, setValores] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: ""
  })

  const [originalValores, setOriginalValores] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    fk_tipo_usuario: "",
    fk_unidad_productiva: "",
    estado: "",
    rol: ""
  });


  const clearForm = () => {
    setValores(originalValores);
    setModal(false);
    setErrores("");
  };


  const editValorInput = (event) => {
    setValores(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const getUser = async () => {
    try {
      const response = await axios.get(`${endpointUser}/${idUser}`);
      const data = response.data.usuario[0];
      const userData = {
        identificacion: data.identificacion,
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        estado: data.estado,
        fk_tipo_usuario: data.fk_tipo_usuario,
        fk_unidad_productiva: data.fk_unidad_productiva,
        rol: data.tipo_usuario,
      };
      setValores(userData);
      setOriginalValores(userData);
    } catch (error) {
      console.log(error);
    }
  };


  const putUser = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.put(`${endpointUser}/${idUser}`, valores, {
        headers: {
          "token": token
        }
      });
      console.log(respuesta)
      if (respuesta.status === 200) {
        const msg = respuesta.data.message;
        AlertSucces(msg);
         // Actualizar nombre en localStorage y estado
         localStorage.setItem("nombres", valores.nombres);
         setName(valores.nombres);

        setModal(false);
        setErrores("");
      }
    } catch (error) {
      setErrores(error.response.data.msg)
      AlertError();
      console.log(error);
    }
  }

  //#region actualizar constraseña

  const [inputPassword, setInputPassword] = useState("")
  const [showInputs, setShowInputs] = useState(true)
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState(false);

  const clearFormPassword = () => {
    setInputPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setErrorPassword(false);
    setModalPassword(false);
    setShowInputs(true);
    setErrores("")
  }

  const verifyPassword = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await axios.post(`${endpointUser}/verify/${idUser}`, {
        password: inputPassword
      })
      if (respuesta.status === 200) {
        console.log("contraseña correcta")
        setShowInputs(false)
      } else {
        console.log("Contraseña incorrecta")
        
      }
    } catch (error) {
      AlertError(error.response.data.message)
      console.log(error)
    }
  }

  const putPassword = async (event) => {
    event.preventDefault();
    try {
      if (newPassword !== confirmNewPassword) {
        setErrorPassword(true);
        return;
      }

      const respuesta = await axios.put(`${endpointUser}/password/${idUser}`, {
        password: newPassword
      })

      if(respuesta.status === 200){
        console.log("contraseña actualizada")
        AlertSucces(respuesta.data.message)
        clearFormPassword();
      } else {
        console.log("error")
      }
      
    } catch (error) {
      setErrores(error.response.data.msg)
      AlertError();
      console.log(error)
    }
  }

  //#endregion actualizar contraseña

  const navigate = useNavigate();
  const closeSesion = () => {
    localStorage.clear();
    navigate("/")
    window.location.reload()
  }

  const showMenu = () => {
    setMenu(!menu)
  }
  const clickFuera = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenu(false);
    }
  };

  useEffect(() => {
    getUser();

    if (modal) {
      getUser();
    }
    document.addEventListener('mousedown', clickFuera);
    return () => {
      document.removeEventListener('mousedown', clickFuera);
    };
  }, [modal]);


  return (
    <Container $menu={menu} ref={menuRef} >
      <div className="menus">
        <div className="menu-user">
          <div className="users">
            <div className="nombres-user">
              <p>{name}</p>
              {
                user && user === "1" && (
                  <p>Administrador</p>
                )
              }
              {
                user && user === "2" && (
                  <p>Encargado</p>
                )
              }
            </div>
            <FiSettings
              onClick={showMenu} />
          </div>
        </div>
        <div className="menu-edit">
          <span onClick={() => { setModal(true), setMenu(false) }}>
            <RiUserSettingsFill />
            Editar Perfil</span>
          <span onClick={() => { setModalPassword(true), setMenu(false) }}>
            <IoLockClosed />
            Cambiar Contraseña</span>
          <div className="close"></div>
          <span onClick={closeSesion}>
            <FiLogOut />
            ¿Cerrar sesión?</span>
        </div>
      </div>
      <Modal
        titulo="DATOS DE USUARIO"
        estado={modal}
        cambiarEstado={clearForm}
      >
        <form className="formulario" onSubmit={putUser}>
          <div className="content-filas">
            <div className="contents">
              <ContentInput>
                <TextField name="identificacion" onChange={editValorInput} value={valores.identificacion} label="Identificación" type="number" />
                {
                  errores && errores.some(([campo]) => campo === "identificacion") && (
                    <p>
                      {errores.find(([campo]) => campo === "identificacion")[1]}
                    </p>
                  )
                }
              </ContentInput>
              <ContentInput>
                <TextField name="nombres" onChange={editValorInput} value={valores.nombres} label="Nombres" type="text" />
                {
                  errores && errores.some(([campo]) => campo === "nombres") && (
                    <p>
                      {errores.find(([campo]) => campo === "nombres")[1]}
                    </p>
                  )
                }
              </ContentInput>
              <ContentInput>
                <TextField name="apellidos" onChange={editValorInput} value={valores.apellidos} label="Apellidos" type="text" />
                {
                  errores && errores.some(([campo]) => campo === "apellidos") && (
                    <p>
                      {errores.find(([campo]) => campo === "apellidos")[1]}
                    </p>
                  )
                }
              </ContentInput>
              <ContentInput>
                <TextField name="email" onChange={editValorInput} value={valores.email} label="Correo electrónico" type="email" />
                {
                  errores && errores.some(([campo]) => campo === "email") && (
                    <p>
                      {errores.find(([campo]) => campo === "email")[1]}
                    </p>
                  )
                }
              </ContentInput>
            </div>
            <div className="contents">
              <ContentInput>
                <TextField name="telefono" onChange={editValorInput} value={valores.telefono} label="Teléfono" type="number" />
                {
                  errores && errores.some(([campo]) => campo === "telefono") && (
                    <p>
                      {errores.find(([campo]) => campo === "telefono")[1]}
                    </p>
                  )
                }
              </ContentInput>
              <ContentInput>
                <TextField name="fk_tipo_usuario" value={valores.fk_tipo_usuario} label="Rol" style={{display: "none"}} />
                {
                  user && user === "1" ? (
                    <TextField name="fk_tipo_usuario" value="Administrador" label="Rol" />
                  ):(
                    <TextField name="fk_tipo_usuario" value="Encargado" label="Rol" />
                  )
                }
              </ContentInput>
              <ContentInput>
                <TextField name="estado" value={valores.estado} label="Estado" />
              </ContentInput>
              <ContentInput>
                <TextField name="fk_unidad_productiva" value={valores.fk_unidad_productiva} label="Unidad Productiva" style={{display: "none"}} />
                <TextField name="fk_unidad_productiva" value={unidad} label="Unidad Productiva" />
              </ContentInput>
              {/* <ContentInput>
          <TextField name="password" onChange={editValorInput} value={valores.password} label="Contraseña" type="password" />
          </ContentInput>
          <ContentInput>
          <TextField name="confirm_password" label="Confirmar contraseña" type="password" />
          </ContentInput> */}
            </div>
          </div>
          <button type="submit">Actualizar Datos</button>
        </form>
      </Modal>
      <Modal
        estado={modalPassword}
        cambiarEstado={clearFormPassword}
        titulo="CAMBIAR CONTRASEÑA"
      >
        {
          showInputs && (
            <form className="form-password" onSubmit={verifyPassword}>
              <div className="password">
                <TextField label="Contraseña actual" value={inputPassword} onChange={(event) => setInputPassword(event.target.value)} required type="password" />
              </div>
              <button>Siguiente</button>
            </form>
          )
        }
        {
          !showInputs && (
            <form className="form-change-password" onSubmit={putPassword}>
              <div className="change-password">
                <TextField
                 value={newPassword} onChange={(event) => setNewPassword(event.target.value)}
                label="Nueva contraseña" required type="password" />
                {
                      errores && errores.some(([campo]) => campo === "password") && (
                        <p>
                          {errores.find(([campo]) => campo === "password")[1]}
                        </p>
                      )
                    }
                <TextField label="Confirmar contraseña" 
                   value={confirmNewPassword}
                   onChange={(event) => setConfirmNewPassword(event.target.value)}
                   required
                   type="password"
                   error={errorPassword} />

                    {
                  errorPassword && (
                    <p>Las contraseñas no coinciden</p>
                  )
                }

              </div>
              <button >CAMBIAR CONTRASEÑA</button>
            </form>
          )
        }





      </Modal>
    </Container>
  )
}

const Container = styled.div`
width: 100%;
height: 70px;
display: flex;
justify-content: end;
align-items: center;
padding: 20px;
background-color: white;
padding-inline-end: 60px;

.form-password{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;


  button{
    background-color: #38a800;
    color: white;
    border-radius: 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;

    &:hover{
      background-color: #38a800d3;
    }
  }
}

.form-change-password{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

.change-password{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  p{
    font-size: 12px;
    color: red;
  }
}
  button{
    background-color: #38a800;
    color: white;
    border-radius: 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
    font-size: 15px;

    &:hover{
      background-color: #38a800d3;
    }
  }
}


.formulario{
  display: flex;
  flex-direction:  column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button{
    background-color: #38a800;
    color: white;
    border-radius: 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
    font-size: 18px;

    &:hover{
      background-color: #38a800d3;
    }
  }

  .content-filas{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    .contents{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
}

.menus{

  .menu-edit {
      position: absolute;
      top: 70px;
      right: 10px;
      background-color: #fafafa;
      box-shadow: 0px 0px 5px 1px gray;
      display: ${(props) => (props.$menu ? "flex" : "none")};
      flex-direction: column;
      border-radius: 5px;
      width: 220px;
      padding: 10px;
      gap: 5px;

      span{
        text-align: start;
        display: flex;
        gap: 5px;
        padding: 10px;
        cursor: pointer;

        &:hover {
          background-color: #d6d0d0;
          border-radius: 10px;
        }
      }

      .close{
        background-color: gray;
        height: 1px;
      }
    }

  .menu-user{
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  border-radius: 10px;

  .users{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 20px;
    padding-block: 10px;
    border-radius: 20px;
    cursor: pointer;
    gap: 20px;

 
    .nombres-user{
      
      p{
        font-size: 14px;
        font-weight: bold;
      }
    }

    svg{
      font-size: 30px;
      color: #38a800;
        transition: 1s;

      &:hover{
        transform: rotate(180deg);
    }
    }
  }

}
}

`;
export default NavBar