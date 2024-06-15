import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-width: 100%;

.table-mui{

  .table{
     width: 100%;

     th{
      background: #38a800;
      color: white;
      padding: 5px;
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

    .inputs-data-category{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    .inputs-data{
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
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
.filas{
  display: flex;
  flex-direction: column;
}

  .contents{
    display: flex;
    flex-direction: column;
    background: white;
    width: 300px;
    height: 70px;
    padding: 5px;
    border-radius: 5px;
    gap: 5px;
    
    p{
      color: red;
      font-size: 12px;
    }

    label{
      font-size: 14px;
      font-weight: 600;
    }
  }
`;