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
      background: #38746c;
      color: white;
      padding: 10px;
     }
  }
  .table-two{
     width: 40%;
     padding: 5px;

     th{
      background: #38746c;
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
      gap: 10px;
      background: #38a80030;
      border-radius: 20px;
      padding: 10px;
      width: 100%;

      .filas{
        display: flex;
        flex-direction: column;
        gap: 10px;
  
      }

      /* input{
        padding: 5px;
        min-width: 40px;
        border: none;
        outline: none;
      } */
      select{
        padding: 4px;
        min-width: 210px;
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
.contents{
  display: flex;
  flex-direction: column;
  background: white;
  padding: 5px;
  border-radius: 5px;
  gap: 4px;
  height: 80px;

  

  p{
    font-size: 12px;
    color: red;
  }

  label{
    font-size: 14px;
    font-weight: 600;
  }

  .inputs-encar{
    display: flex;
    
    .idunidad {
      width: 40px;
    }
  }
}
`;