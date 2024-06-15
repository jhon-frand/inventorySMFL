import styled from "styled-components"
import logoInventory from "../../assets/inventory.png"
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../modals/Modal"
import { TextField } from "@mui/material";
import axios from "axios";
import { endpointUser } from "../endpoints/Endpoints";
import { AlertSucces, AlertError } from "../alerts/Alerts";

function NavBar() {

  const [modal, setModal] = useState(false);
  const user = localStorage.getItem("user");
  const name = localStorage.getItem("nombres");
  const idUser = localStorage.getItem("usuario");
  const token = localStorage.getItem("token");
  const [menu, setMenu] = useState(false)

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
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();
  const closeSesion = () => {
    localStorage.removeItem("token");
    navigate("/")
    window.location.reload()
  }

  const showMenu = () => {
    setMenu(!menu)
  }
  useEffect(() => {
    getUser();
  }, [])

  return (
    <Container $menu={menu} >
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
        cambiarEstado={() => setModal(false)}
      >
        <form className="formulario" onSubmit={putUser}>
          <TextField name="identificacion" onChange={editValorInput} value={valores.identificacion} label="Identificación" type="number" />
          <TextField name="nombres" onChange={editValorInput} value={valores.nombres} label="Nombres" type="text" />
          <TextField name="apellidos" onChange={editValorInput} value={valores.apellidos} label="Apellidos" type="text" />
          <TextField name="email" onChange={editValorInput} value={valores.email} label="Correo electrónico" type="email" />
          <TextField name="telefono" onChange={editValorInput} value={valores.telefono} label="Teléfono" type="number" />
          <TextField name="fk_tipo_usuario" value={valores.fk_tipo_usuario} label="Rol" />
          <TextField name="estado" value={valores.estado} label="Estado" />
          <TextField name="fk_unidad_productiva" value={valores.fk_unidad_productiva} label="Unidad Productiva" />
          <TextField name="password" onChange={editValorInput} value={valores.password} label="Contraseña" type="password" />
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
background-color: #edf3eb;

.formulario{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    background: white;
    padding-inline: 20px;
    padding-block: 10px;
    border-radius: 20px;
    cursor: pointer;
    gap: 20px;

    .nombres-user{
      p{
        font-size: 14px;
      }
    }

    svg{
      font-size: 30px;
      color: #38a800;
    }
  }

}
}

p{
  color: black;
  font-weight: bold;
}

.logo{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  h1{
    font-size: 25px;
    color: #00324d;
  }
  img{
    width: 60px;
    height: 60px;
  }
}


`;
export default NavBar