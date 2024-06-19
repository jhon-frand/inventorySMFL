import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import MyRoutes from "./routers/routes";
import SideBar from "./components/organismos/SideBar";
import { useState } from "react";
import NavBar from "./components/organismos/NavBar";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

function App() {

  const [sideBarOpen, setSideBarOpen] = useState(true);

  const token = localStorage.getItem('token')

  const login = token !== null;
 
  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path="/restablecer" element={<ResetPassword />} />

                {login ? (
                    <Route path="/*" element={
                        <Container>
                            <SideBarContainer>
                                <SideBar openSide={sideBarOpen} setOpenSide={setSideBarOpen} />
                            </SideBarContainer>
                            <Content $sideBarOpen={sideBarOpen}>
                                <NavBarContainer $sideBarOpen={sideBarOpen}>
                                    <NavBar />
                                </NavBarContainer>
                                <MyRoutes />
                            </Content>
                        </Container>
                    } />
                ) : (
                    <Route path="/*" element={<Login />} />
                )}
            </Routes>
        </BrowserRouter>
    </>
  );
}

const Container = styled.div`
  position: relative; /* Establecer posición relativa para poder posicionar el contenido principal */
  display: flex;
  min-height: 100vh;
  //background: #edf3eb;
  background-color: white;
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
  left: ${({ $sideBarOpen }) => ($sideBarOpen ? "290px" : "120px")}; /* Ajustar el espacio de la barra lateral */
  right: 0; 
  z-index: 30; 
`;

export default App;
