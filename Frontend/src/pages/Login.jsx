import { useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import logoInventory from "../assets/logogreen.png"
import { AlertError, AlertNotFound, AlertSucces, AlertUser } from '../components/alerts/Alerts';
import Modal from "../components/modals/Modal"
import { endpointRecuperar, endpointLogin } from '../components/endpoints/Endpoints';
import { LinearProgress, TextField } from "@mui/material";
import { HiOutlineMail } from "react-icons/hi";
import CircularIntegration from "../components/progress/CircularIntegration"

function Login() {

  const navigate = useNavigate();
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState({
    email: ""
  })

  const clearForm = () => {
    setEmail({
      email: ""
    })
    setModal(false)
    setLoading(false)
  }
  const inputEmail = (event) => {
    setEmail({
      ...email,
      [event.target.name]: event.target.value
    })
  }
  const sendEmail = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const respuesta = await axios.post(endpointRecuperar, email);
      if (respuesta.status === 200) {
        AlertSucces("Revisa tu correo")
        clearForm()
      }

    } catch (error) {
      console.log(error);
      AlertNotFound("El correo no es válido");
      setLoading(false);
    }
  }

  const [valores, setValores] = useState({
    email: "",
    password: ""
  })
  const valorInput = (event) => {
    setValores({
      ...valores,
      [event.target.name]: event.target.value
    })
  }
  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(endpointLogin, valores, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const { token, user, unidad, nombres, id_unidad, usuario, estado } = response.data;

        // Verificar el estado del usuario
        if (estado === 'inactivo') {
          AlertUser();
        } else {
          localStorage.setItem("token", token);
          localStorage.setItem("user", user);
          localStorage.setItem("unidad", unidad);
          localStorage.setItem("nombres", nombres);
          localStorage.setItem("id_unidad", id_unidad);
          localStorage.setItem("usuario", usuario);
          localStorage.setItem("estado", estado);

          AlertSucces("Bienvenido");
          navigate('/dashboard');
          window.location.reload();
        }
      }
    } catch (error) {
      AlertError();
      console.log(error);
    }
  };


  return (
    <Container>
      <div className="content-formulario">
        <div className="content">
          <div className="logo">
            <img src={logoInventory} alt="INVENTORY" />
          </div>

          <div className="texts">
            <p className='text-init'>Inicia Sesión</p>
            <p className='text-inv'>Ir a Inventory</p>
          </div>

        </div>

        <div className="banner">
          <form onSubmit={loginUser} className="form">

            <TextField label="Correo electrónico" name="email" className='input' value={valores.email} onChange={valorInput} type="email" required />

            <TextField label="Contraseña" name="password" className='input' value={valores.password} onChange={valorInput} type="password" required />

            <button className="submit">Iniciar sesión</button>

            <div className="reset">
              <p className='linkReset' onClick={() => setModal(true)} >¿Has olvidado tu contraseña?</p>
            </div>

          </form>
        </div>
      </div>
      <Modal
        titulo="RECUPERAR CONTRASEÑA"
        estado={modal}
        cambiarEstado={clearForm}
      >
        <form className='form-email' onSubmit={sendEmail}>
          <div className='init'>
            <HiOutlineMail />
            <p>
              Ingresa tu correo electrónico de recuperación
            </p>
          </div>
          <TextField label="Correo electrónico" name='email' value={email.email} onChange={inputEmail} type="email" required />
          <button className='submit' >Enviar</button>
          {
            loading && <LinearProgress color="success" />
          }
        </form>


      </Modal>

    </Container>
  )
}

const Container = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f1f1f1;

      .content-formulario{
        display: flex;
        width: 700px;
        height: 400px;
        background-color: white;
        border-radius: 30px;
        padding: 40px;
        box-shadow: 1px 1px 5px 1px #aeafae;
      }

.content{
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px; 

  .logo{
    padding-left: 20px;
  }
  .texts{
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .text-init{
    font-size: 33px;
  }
  img{
    width: 25%;
  }
}
              
.banner {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 90%;
    padding-top: 60px;

    .input{
      width: 100%;
    }
       
        }
}
  


.linkReset{
  color: #38a800;
  cursor: pointer;
}

.submit {
  border: none;
  width: 100%;
  padding: 10px;
  font-size: 20px;
  border-radius: 40px;
  letter-spacing: 1px;
  cursor: pointer;
  background-color: #38a800;
  color: white;

  &:hover{
    background:#38a800d3;
  }
}

.form-email{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 10px;

    .init{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      svg{
        font-size: 20px;
      }

    }


  }
`;

export default Login