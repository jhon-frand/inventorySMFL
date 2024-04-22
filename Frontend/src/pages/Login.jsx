import { useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import logoInventory from "../assets/inventory.png"
import logoSena from "../assets/sena.png"
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { AlertSucces, AlertUser } from '../components/alerts/Alerts';

function Login() {

  const navigate = useNavigate();

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
      {/* <div className="navbar">
      <img src={logoInventory} alt="logo Inventory" />
        <h3>INVENTORY</h3>
      </div>
    <div className="content">
    <div className="left-content">
        <div className='text-content'>
        <img src={logoSena} alt="logo Inventory" />
        <p>CENTRO DE GESTIÓN Y DESARROLLO SOSTENIBLE SURCOLOMBIANO</p>
        </div>
      </div>
      <div className="right-content">
          <div className="wrapper">
            <form onSubmit={loginUser} className="form">
              <h1 className="title">¡Hola de nuevo!</h1>
              <div className="inp">
                <AiOutlineMail />
                <input name="email" className='input' value={valores.email} onChange={valorInput} type="email" placeholder='email' />
              </div>
              <div className="inp">
                <AiOutlineLock />
                <input name="password" className='input' value={valores.password} onChange={valorInput} type="password" placeholder='password' />
              </div>
              <button className="submit">Iniciar sesión</button>
              <p className="footer">¿Olvidó su contraseña?<a href="" className='linkRegister' >¡Recuperar!</a></p>
            </form>
            <div className="banner">
              <h1 className="wel_text">Bienvenido</h1>
              <p className="para">A INVENTORY</p>
            </div>
          </div>
        </div>
    </div> */}

    
            <form onSubmit={loginUser} className="form">
              <div className='content-form'>
              <h1 className="title">¡Hola de nuevo!</h1>
              <div className="inp">
                <AiOutlineMail />
                <input name="email" className='input' value={valores.email} onChange={valorInput} type="email" placeholder='email' />
              </div>
              <div className="inp">
                <AiOutlineLock />
                <input name="password" className='input' value={valores.password} onChange={valorInput} type="password" placeholder='password' />
              </div>
              <button className="submit">Iniciar sesión</button>
              <p className="footer">¿Olvidó su contraseña?<a href="" className='linkRegister' >¡Recuperar!</a></p>
            
              </div>
              </form>
            <div className="banner">
              <h1 className="wel_text">Bienvenido</h1>
              <p className="para">A INVENTORY</p>
              <img src={logoInventory} alt="" />
            </div>
         
    </Container>
  )
}

const Container = styled.div`
      display: flex;
      height: 100vh;

::-webkit-input-placeholder {
  color: gray;
}

        .form {
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       width: 40%;

       .content-form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        box-shadow: 0 0 5px gray;
        width: 50%;
        height: 500px;
        padding: 20px;
       }
              }
              
.banner {
  width: 60%;
  background: linear-gradient(to right, rgba(43, 202, 37, 0.37), #38a800);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 60% 100%);
  padding-right: 100px;
  gap: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  img{
    width: 200px;
    height: 200px;
  }
}
  

.title {
  font-size: 30px;
  color: #79D70F;
}

.inp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
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
  font-size: 100px;
  line-height: 50px;
  color: #ECF3F6;

}

.para {
  font-size: 40px;
  line-height: 24px;
  letter-spacing: 1px;
  color: #ECF3F6;

}
.footer {
  margin-top: 30px;
  letter-spacing: 0.5px;
  font-size: 14px;
  cursor: pointer;
}
a{
  margin-left: 10px;
  text-decoration: none;
  color: #359107;
}
.submit {
  border: none;
  outline: none;
  width: 288px;
  margin-top: 25px;
  padding: 10px;
  font-size: 20px;
  border-radius: 40px;
  letter-spacing: 1px;
  cursor: pointer;
  background: linear-gradient(45deg, rgba(25, 196, 20, 0.555), #38a800);
  color: aliceblue;

  &:hover{
    background:#38a800;
    color: aliceblue;
  }
}
`;

export default Login