import styled from "styled-components"
import NavBar from "../components/organismos/NavBar";

function Unidades() {

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

.table-mui{
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;

  .table{
     width: 90%;
     padding: 5px;

     th{
      background: #38A800;
      color: white;
      padding: 10px;
     }
  }


`;

const Modales = styled.div`
position: absolute;
top: 0;
left: 0;
z-index: 30;

.formulario{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .contents{
    display: flex;
    flex-direction: column;
    background: white;
    padding: 15px;
    border-radius: 5px;
    gap: 10px;

    label{
      font-size: 14px;
      font-weight: 600;
    }

    input{
      padding: 5px;
      width: 280px;
      border: none;
      outline: none;
      border-bottom: 1px solid #38a800;
    }
  }

  button{
    width: 200px;
    height: 40px;
    background: #38a800;
    color: white;
    font-weight: 600;
    border-radius: 5px;
    border: none;
    margin-top: 20px;
  
    &:hover{
      cursor: pointer;
      background: #38a80090;
      color: green;
    }
  }

}
.inputs-data{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #38a80030;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
}
`;
export default Unidades