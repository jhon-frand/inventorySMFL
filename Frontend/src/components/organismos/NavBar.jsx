import styled from "styled-components"
import logoInventory from "../../assets/inventory.png"
import { FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FiBell } from "react-icons/fi";

function NavBar() {

    const nameUser = localStorage.getItem("nombres")

  return (
    <Container>
          <p>Hi!, {nameUser}</p>
        <div className="logo">
          <img src={logoInventory} alt="logo Inventory" />
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
`;
export default NavBar