import NavBar from "../components/organismos/NavBar"
import styled from "styled-components"

function Dashboard() {

  return (
    <>
    <Container>
      <NavBar/>
      <div className="contenedor">
  
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