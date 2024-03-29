import { FaUser } from "react-icons/fa";
import HeaderPageTwo from "../components/organismos/HeaderPageTwo";
import NavBar from "../components/organismos/NavBar"
import styled from "styled-components"
import { useState } from "react";
import MediumContainer from "../components/organismos/MediumContainer";


function Dashboard() {
  const [show, setShow] = useState(false);

  return (
    <>
    <Container>
      <NavBar/>
      <div className="contenedor">
      <HeaderPageTwo icon={<FaUser/>} titulo="UBICACIONES Y UNIDADES PRODUCTIVAS" textButton1="REGISTRAR UNIDAD" textButton2="REGISTRAR UBICACIÓN" />
        <MediumContainer>
        </MediumContainer>
      </div>
    </Container>
    </>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-width: 100%;

.contenedor{
  background: #38A80020;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
`;
export default Dashboard