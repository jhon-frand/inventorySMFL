import styled from "styled-components"
import React, { useState } from 'react'
import Dashboard from '../../pages/Dashboard';



function Login() {

    //Capturacion de datos
    const [userEmail,setUserEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);

     //Esta es la funcion que registra el LogIn
     const handleForm = (e) =>{
        e.preventDefault();

        //Este es el objeto con la informacion que queremos enviar al BackEnd
        const data = {
            email: userEmail,
            password: password
        }

        fetch('http://localhost:3000/validar', {
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },  
          body: JSON.stringify(data)

        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if(result.token){
              
                console.log(result);
                localStorage.setItem('token', result.token);
                setLoginSuccessful(true);
            }else{
                setLoginSuccessful(false);
            }
        })
        .catch(error =>{
          console.log(error)
        })

    }

  return (
    <Container>
      {loginSuccessful ? <Dashboard/> : 
        

<div className="wrapper">
<form action="" className="form">
  <h1 className="title">Inicio</h1>
  <div className="inp">
    <input onChange={(event)=>{setUserEmail(event.target.value)}} type="text" className="input" placeholder="Ingrese su email..." />
  </div>
  <div className="inp">
    <input  onChange={(event)=>{setPassword(event.target.value)}}   type="text" className="input" placeholder="Ingrese su contraseña..." />
  </div>
  <button onClick={handleForm} className="submit">Iniciar sesión</button>
  <p className="footer">No estás registrado?<a href="" className='linkRegister' >¡Regístrate!</a></p>
</form>

<div className='divvacio'></div>
<div className="banner">
  <h1 className="wel_text">Bienvenido</h1>
  <p className="para">INVENTORY</p>
</div>
</div>

        
      }
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
padding: 20px;
background: white;


::-webkit-input-placeholder {
  color: #79D70F;
}

.wrapper {
  position: relative;
  width: 800px;
  height: 65vh;
  top: 150px;
  left: 150px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 3px solid #00bd10;
  box-shadow: 0 0 50px 0 #38a7009d;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255,  0.856);

}

.title {
  font-size: 35px;
  color: #79D70F;
}

.inp {
  padding-bottom: 10px;
  border-bottom: 2px solid #cecece;
}

.input {
  border: none;
  outline: none;
  background: none;
  width: 260px;
  margin-top: 40px;
  padding-right: 10px;
  font-size: 17px;
  color: #79D70F;
}

.banner {
  position: absolute;
  top: 0;
  right: 0;
  width: 450px;
  height: 100%;
  background: linear-gradient(to right, rgb(216, 216, 216), #38a8009d);
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

.submit {
  border: none;
  outline: none;
  width: 288px;
  margin-top: 25px;
  padding: 10px 0;
  font-size: 20px;
  border-radius: 40px;
  letter-spacing: 1px;
  cursor: pointer;
  background: linear-gradient(45deg, #15ce04, #d2d4d4);
  color: aliceblue;
}

.footer {
  margin-top: 30px;
  letter-spacing: 0.5px;
  font-size: 14px;
  cursor: pointer;
}
a{
  margin-left: 10px;
}

.divvacio{
  background-color: rgba(255, 255, 255, 0.856);
}

.link {
  color: #0ef;
  text-decoration: none;
}

`

export default Login
