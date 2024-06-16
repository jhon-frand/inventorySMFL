import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;

.table-mui{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon-activity{
    font-size: 30px;
    color: orange;
    cursor: pointer;

    &:hover{
      color: #38A800;
    }
  }

  .table{
     width: 100%;

     th{
      background: #38a800;
      color: white;
      padding: 10px;
     }

     .btns-edit{
      display: flex;
      justify-content: center;
      gap: 10px;
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

  .inputs-data-tecnico{
    display: flex;
    justify-content: center;
    align-items: center;
  }
    .inputs-data{
      display: flex;
      justify-content: center;
      align-items: center;


      .input-manteinment{
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        gap: 10px;
        background: #90b8b0;

        input{
          background: #90b8b0;
        }
      }

     
    }
    .filas{
        display: flex;
        flex-direction: column;

        .description{
          display: flex;
          flex-direction: column;
          background: white;
          padding: 5px;
          height: 230px;
          border-radius: 5px;
          gap: 10px;
        }
        .onlyRead{
          background: #38a80067;
        }
       

         .onlyRead{
          display: flex;
          flex-direction: column;
          padding: 4px;
          width: 280px;
          height: 70px;
          border-radius: 5px;
          gap: 4px;

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
.inputs-encar{
    display: flex;
    
  .idnombreUser{
  width: 100%;
  }
    .idunidad {
      width: 40px;
    }
  }
}

`;