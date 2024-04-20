import { useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import { useNavigate } from "react-router-dom";
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
          <p className="para">INVENTORY</p>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background: #80808013;


::-webkit-input-placeholder {
  color: gray;
}

.wrapper {
  position: relative;
  width: 800px;
  height: 65vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 3px solid #38a800;
  box-shadow: 0 0 20px 0 #38a7009d;
  background: white;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

.banner {
  position: absolute;
  top: 0;
  right: 0;
  width: 450px;
  height: 100%;
  background: linear-gradient(to right, rgba(43, 202, 37, 0.37), #38a800);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 60% 100%);
  padding-right: 70px;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  
}

.wel_text {
  font-size: 40px;
  margin-top: -50px;
  line-height: 50px;
  color: #ECF3F6;

}

.para {
  margin-top: 10px;
  font-size: 18px;
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