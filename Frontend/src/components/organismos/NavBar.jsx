import styled from "styled-components"
import logo from "../../assets/inventoryview.png"
import { FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom"
import { LuLogOut } from "react-icons/lu";

function NavBar() {

    const user = localStorage.getItem("user")

  const navigate = useNavigate();
  const closeSesion = () => {
    alert('quieres cerrar sesión?')
    localStorage.removeItem("token");
    navigate("/")
    window.location.reload()
  }

  return (
    <Container>
          {
             user && user === "1" &&(
              <p>Administrador</p>
             )
          }
          {
          user && user === "2" && (
          <p>Encargado</p>
          )
          }

        <div className="logo">
          <img src={logo} alt="logo sena" />
          <h1>INVENTORY</h1>
        </div>
        <div className="menu-user">
          <div className="notify">
          <FiBell />
          </div>
        <div className="users">
        <FaUserCircle />
        <FiSettings />
        </div>
        <div className="closed-btn">
            <button onClick={closeSesion}><LuLogOut /></button>
          </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
width: 100%;
height: 70px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px;
background: white;
box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.3);

p{
  background: #385c57;
  color: white;
  padding: 10px;
  border-radius: 15px;
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

.menu-user{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 200px;
  border-radius: 10px;

  .users{
    display: flex;
    align-items: center;
    justify-content: center;
    background: #cb7755;
    padding: 10px;
    gap: 20px;
    border-radius: 20px;
    cursor: pointer;

    svg{
      font-size: 25px;
      color: white;
    }
  }

  .notify{
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffce40;
    padding: 10px;
    gap: 20px;
    border-radius: 20px;
    cursor: pointer;

    svg{
      font-size: 20px;
      color: white;
    }
  }
  .closed-btn{
    button{
      padding: 5px;
      border-radius: 10px;
      border: none;
      background: #00324d;
      color: white;

      svg{
        font-size: 25px;
      }
    }
  }
}
`;
export default NavBar