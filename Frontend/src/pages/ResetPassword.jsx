import styled from "styled-components"
import Modal from "../components/modals/Modal"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

function ResetPassword() {

  const [modal, setModal] = useState(true)
  const location = useLocation();
  const navigate = useNavigate();

  //buscar el token de la url
  const token = new URLSearchParams(location.search).get('token');

  const [password, setPassword] = useState({
    password: ""
  });
  const [confirm, setConfirm] = useState({
    confirm: ""
  });

  const inputPassword = (event) => {
    setPassword({
      ...password,
       [event.target.name]: event.target.value
    })
  }
  const inputConfirm = (event) => {
    setConfirm({
      ...confirm,
       [event.target.name]: event.target.value
    })
  }

  const changePassword = async (event) => {
    event.preventDefault();
    try {
      if (password.password === confirm.confirm ) {
        await axios.put('http://localhost:3000/password/reset', { token, password: password.password });
        alert('Contraseña restablecida con éxito');
        navigate('/');
      } else {
        
        alert("Las contraseñas no coinciden") 
      }
    } catch (error) {
        alert('Hubo un error al restablecer la contraseña');
        console.log(error);
    }
};
  return (
    <Container>
       <Modal 
       estado={modal}
       cambiarEstado={()=> setModal(false)}
    titulo="INGRESA TU NUEVA CONTRASEÑA"
    >
      <Formulario onSubmit={changePassword} >
        <input name="password" value={password.password}  onChange={inputPassword} type="text" placeholder="New Password"/>
        <input name="confirm" value={confirm.confirm}  onChange={inputConfirm} type="text" placeholder="Confirm New Password"/>
        <button>CAMBIAR CONTRASEÑA</button>
      </Formulario>
    </Modal>
    </Container>
  )
}

const Container = styled.div`
width: 100%;
height: 100vh;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #38a80060;
  padding: 15px;
  border-radius: 10px;

  input{
    padding: 10px;
    border: none;
    outline: none;
  }

  button{
    padding: 10px;
    border-radius: 10px;
    border: none;
    color: white;
    background: #38a800;
    font-weight: bold;
  }

`;

export default ResetPassword