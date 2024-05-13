import { useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import logoInventory from "../assets/inventory.png"
import logoSena from "../assets/sena.png"
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { AlertSucces, AlertUser } from '../components/alerts/Alerts';
import Modal from "../components/modals/Modal"

function Login() {

  const navigate = useNavigate();
  const [modal, setModal] = useState(false)

  const [email, setEmail] = useState({
    email: ""
  })
  const inputEmail = (event) => {
    setEmail({
      ...email,
       [event.target.name]: event.target.value
    })
  }
  const sendEmail = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/password/recuperar", email);
      AlertSucces("Revisa tu correo para restablecer la contraseña")
      setModal(false)
    } catch (error) {
      console.log(error);
      alert("Error al enviar el correo")
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
      const response = await axios.post("http://localhost:3000/login", valores, {
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

          AlertSucces("Bienvenido a Inventory");
          navigate('/dashboard');
          window.location.reload();
        }
      }
    } catch (error) {
      AlertUser();
      console.log(error);
    }
  };


  return (
    <Container>
      <div className="content">
      <img src={logoInventory} alt="INVENTORY" />
        <h1 className="wel_text">INVENTORY</h1>
        <p className="para"></p>
       <footer>
        <img src={logoSena} alt="SENA"/>
        <p>CENTRO DE GESTIÓN Y DESARROLLO SOSTENIBLE SURCOLOMBIANO</p>
       </footer>
      </div>


      <div className="banner">
        <form onSubmit={loginUser} className="form">
          <div className='content-form'>
            <h1 className="title">¡Bienvenido!</h1>
            <div className="inp">
              <AiOutlineMail />
              <input name="email" className='input' value={valores.email} onChange={valorInput} type="email" placeholder='email' />
            </div>
            <div className="inp">
              <AiOutlineLock />
              <input name="password" className='input' value={valores.password} onChange={valorInput} type="password" placeholder='password' />
            </div>
            <div className="checkbox">
            <input type="checkbox" />
            <p>¿Recordarme?</p>
            </div>
            <button className="submit">Iniciar sesión</button>
            <div className="reset">
            <p className="footer">¿Olvidaste tu contraseña?</p>
            <p className='linkRegister' onClick={() => setModal(true)} >¡Recupérala!</p>
            </div>
          </div>
        </form>
      </div>
      <Modal
      titulo="RECUPERAR CONTRASEÑA"
      estado={modal}
      cambiarEstado={() => setModal(false)}
      >
        <form className='form-email' onSubmit={sendEmail}>
          <input name='email' value={email.email} onChange={inputEmail} type="email"  placeholder='Ingresa tu Email' required/>
          <button>ENVIAR</button>
        </form>

      </Modal>

    </Container>
  )
}

const Container = styled.div`
      display: flex;
      height: 100vh;
      background: white;

::-webkit-input-placeholder {
  color: gray;
}

.content{
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  img{
    width: 30%;
  }

  footer{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    position: absolute;
    bottom: 0;
    p{
      border-left: 2px solid green;
      padding: 10px;
      text-align: center;
      color: gray;
    }

    img{
      width: 100px;
    }
  }
}
              
.banner {
  width: 60%;
 background: radial-gradient(#38a8005a, #38a800);
 clip-path: polygon(0 0, 100% 0, 100% 100%, 20% 100%);
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       position: relative;

       img{
        width: 130px;
        position: absolute;
        top: 0;
        
       }

       .content-form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        box-shadow: 0 0 5px white;
        height: 500px;
        padding: 40px;
       background: white;
       }

       .checkbox{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 15px;

        input{
          cursor: pointer;
        }
       }
              }
}
  

.title {
  font-size: 30px;
  color: #38a800;
  margin-bottom: 20px;
}

.inp {
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 2px solid #cecece;

  svg{
    font-size: 20px;
    color: gray;
  }
}

.input {
  border: none;
  outline: none;
  width: 260px;
  padding: 5px;
  padding-right: 10px;
  font-size: 17px;
  
}



.wel_text {
  font-size: 80px;
  color: #00324d;

}

.para {
  font-size: 40px;
  color: #00324d;

}


.reset{
  margin-top: 20px;
  display: flex;
  gap: 15px;

  .footer {
  letter-spacing: 0.5px;
  font-size: 14px;
  cursor: pointer;
}

.linkRegister{
  color: #38a800;
  cursor: pointer;
}
}
.submit {
  border: none;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  border-radius: 40px;
  letter-spacing: 1px;
  cursor: pointer;
  background: linear-gradient(45deg, rgba(25, 196, 20, 0.555), #38a800);
  color: white;

  &:hover{
    background:#38a800;
  }
}

.form-email{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 10px;

  input{
    padding: 10px;
    border: 1px solid #00324d;
    border-radius: 5px;
    outline: none;
    background: none;
  }

  button{
    border: none;
    padding: 10px;
    border-radius: 40px;
    letter-spacing: 1px;
    cursor: pointer;
    background: #38a800;
    color: white;
  }
  }
`;

export default Login