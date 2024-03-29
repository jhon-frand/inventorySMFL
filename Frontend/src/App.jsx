import { BrowserRouter } from "react-router-dom"
import styled from "styled-components"
import MyRoutes from "./routers/routes"
import SideBar from "./components/organismos/SideBar"
import { useState } from "react"

function App() {

  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <>
     <BrowserRouter>
    <Container className={sideBarOpen ? "active" : ""}>
    <SideBar openSide={sideBarOpen} setOpenSide={setSideBarOpen} />
     <MyRoutes/> 
    </Container>
    </BrowserRouter>
    </>
  )
}

const Container = styled.div`
display: grid;
grid-template-columns: 80px auto;
transition: all 0.3s;
&.active{
  grid-template-columns: 250px auto;
}
`;

export default App
