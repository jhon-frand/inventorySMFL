import styled from "styled-components"
import logoInventory from "../../assets/inventory.png"
import { FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useState } from "react";

function NavBar() {

    const nameUser = localStorage.getItem("nombres")

    const [menu, setMenu] = useState(false)

    const showMenu = () => {
      setMenu(!menu)
    }

  return (
    <Container $menu = {menu} >
          <p>Hi!, {nameUser}</p>
        <div className="logo">
          <img src={logoInventory} alt="logo Inventory" />
          <h1>INVENTORY</h1>
        </div>
        <div className="menus">
        <div className="menu-user">
          <div className="notify">
          <FiBell />
          </div>
        <div className="users">
        <FaUserCircle />
        <FiSettings 
         onClick={showMenu}  />
        </div>
        </div>
        <div  className="menu-edit">
          <span>Editar Perfil</span>
          <span>¿Cerrar sesión?</span>
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

.menus{
  .menu-edit {
      position: absolute;
      top: 70px;
      background-color: #f0f0f0;
      box-shadow: 0px 0px 5px 1px gray;
      display: ${(props) => (props.$menu ? "flex" : "none")};
      flex-direction: column;
      border-radius: 5px;
      width: 140px;

      span {
        text-align: center;
        padding: 10px;
        color: #00324d;
        cursor: pointer;

        &:hover {
          background-color: white;
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

}
}

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


`;
export default NavBar