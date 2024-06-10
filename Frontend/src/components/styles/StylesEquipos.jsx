import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-width: 100%;

  .table-medium{
    width: 90%;
    padding: 5px;

    th{
     background: #38746c;
     color: white;
     padding: 5px;
    }
  }

.table-mui{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .table{
     width: 90%;
     padding: 5px;

     th{
      background: #38746c;
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
      background: #38a80030;
      width: 100%;
      border-radius: 10px;
      padding: 10px;
    }
    .inputs-data{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      background: #38a80030;
      border-radius: 20px;
      padding: 10px;

      select{
        padding: 4px;
        min-width: 150px;
        border: none;
        outline: none;
      }
      textarea{
        min-width: 150px;
        height: 170px;
        border: none;
        outline: none;
        resize: none;
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
.filas{
  display: flex;
  flex-direction: column;
  gap: 10px;

  .description{
    display: flex;
    flex-direction: column;
    background: white;
    width: 100%;
    height: 230px;
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