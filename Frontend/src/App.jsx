import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import MyRoutes from "./routers/routes";
import SideBar from "./components/organismos/SideBar";
import { useState } from "react";
import NavBar from "./components/organismos/NavBar";

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Container>
          <SideBarContainer>
            <SideBar openSide={sideBarOpen} setOpenSide={setSideBarOpen} />
          </SideBarContainer>
          <Content $sideBarOpen={sideBarOpen}>
          <NavBarContainer $sideBarOpen={sideBarOpen}>
           <NavBar/>
        </NavBarContainer>
            <MyRoutes />
          </Content>
        </Container>
      </BrowserRouter>
    </>
  );
}

const Container = styled.div`
  position: relative; /* Establecer posición relativa para poder posicionar el contenido principal */
  display: flex;
  min-height: 100vh;
  background: #38a80030;
  padding-bottom: 20px;
`;

const SideBarContainer = styled.div`
  position: absolute; 
  top: 0; 
  bottom: 0; 
`;

const Content = styled.div`
  transition: all 0.3s;
  margin-left: ${({ $sideBarOpen }) => ($sideBarOpen ? "250px" : "80px")}; /* Dejar espacio para la barra lateral */
  flex: 1; /* El contenido principal ocupará todo el espacio restante */
  overflow-y: auto; /* Agregar desplazamiento vertical si el contenido es demasiado largo */
`;

const NavBarContainer = styled.div`
  transition: all 0.3s;
  position: fixed; 
  top: 0; 
  left: ${({ $sideBarOpen }) => ($sideBarOpen ? "250px" : "80px")}; /* Ajustar el espacio de la barra lateral */
  right: 0; 
  z-index: 30; 
`;

export default App;
