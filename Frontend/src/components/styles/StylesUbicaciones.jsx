import styled from "styled-components";

export const Container = styled.div`
display: flex;

.table-mui{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:20px;

  .width-48 {
  width: 48%;
}

.width-90 {
  width: 90%;
}
  .table-one{
     padding: 5px;

     th{
      background: #38a800;
      color: white;
      padding: 10px;
     }
  }
  .table-two{
     width: 40%;
     padding: 5px;

     th{
      background: #38a800;
      color: white;
      padding: 10px;
     }
  }
}
`;
export const Modales = styled.div`
position: absolute;
top: 0;
left: 0;
z-index: 30;

.formulario{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

    .inputs-data{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90%;

      .filas{
        display: flex;
        flex-direction: column;
        width: 100%;
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

 
  .inputs-encar{
    display: flex;
    
    .idunidad {
      width: 40px;
    }
  }

`;