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

function NavBar() {

  const [modal, setModal] = useState(false);
  const user = localStorage.getItem("user");
  const name = localStorage.getItem("nombres");
  const idUser = localStorage.getItem("usuario");
  const token = localStorage.getItem("token");
  const [menu, setMenu] = useState(false);
  const [errores, setErrores] = useState("");
  const menuRef = useRef(null);

  const [valores, setValores] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    password: "",
    fk_tipo_usuario: "",
    fk_unidad_productiva: "",
  })

  const editValorInput = (event) => {
    setValores(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const getUser = async () => {
    try {
      await axios.get(`${endpointUser}/${idUser}`).then((response) => {
        const data = response.data.usuario[0];
        setValores({
          identificacion: data.identificacion,
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.email,
          telefono: data.telefono,
          estado: data.estado,
          fk_tipo_usuario: data.fk_tipo_usuario,
          fk_unidad_productiva: data.fk_unidad_productiva,
          rol: data.tipo_usuario,
        })
      })
    } catch (error) {
      console.log(error);
    }
  }

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
        setModal(false);
        setErrores("");
      }
    } catch (error) {
      setErrores(error.response.data.msg)
      AlertError();
      console.log(error);
    }
  }

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
    document.addEventListener('mousedown', clickFuera);
    return () => {
      document.removeEventListener('mousedown', clickFuera);
    };
  }, []);

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
          <span onClick={() => { setModal(true), setMenu(false) }}>Editar Perfil</span>
          <span onClick={closeSesion}>¿Cerrar sesión?</span>
        </div>
      </div>
      <Modal
        titulo="DATOS DE USUARIO"
        estado={modal}
        cambiarEstado={() => {setModal(false), setErrores("")}}
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
          
          </div>
         <div className="contents">
         <ContentInput>
         <TextField name="fk_tipo_usuario" value={valores.fk_tipo_usuario} label="Rol" />
         </ContentInput>
          <ContentInput>
          <TextField name="estado" value={valores.estado} label="Estado" />
          </ContentInput>
          <ContentInput>
          <TextField name="fk_unidad_productiva" value={valores.fk_unidad_productiva} label="Unidad Productiva" />
          </ContentInput>
          <ContentInput>
          <TextField name="password" onChange={editValorInput} value={valores.password} label="Contraseña" type="password" />
          </ContentInput>
          <ContentInput>
          <TextField name="confirm_password" label="Confirmar contraseña" type="password" />
          </ContentInput>
         </div>
         </div>
          <button type="submit">Actualizar Datos</button>
        </form>
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
//background-color: #fdfdfd;
background-color: white;
padding-inline-end: 60px;
//border-bottom: 1px solid #38a800;

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
      width: 180px;
      padding: 5px;

      span {
        text-align: center;
        padding: 10px;
        cursor: pointer;

        &:hover {
          background-color: #d6d0d0;
          border-radius: 10px;
        }
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