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
    color: gray;
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

.form-manteinment{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .content-rows{

    .row-one{
      display: flex;

      .inputs-row-one, .inputs-two-row-one{
        display: flex;
        flex-direction: column;
        width: 200px;
      }
    }

    .row-two{

      .description{

        .text-description{
          width: 100%;
        }

        p{
          font-size: 12px;
          color: red;
        }
      }
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

.form-activity{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content-columns{
    display: flex;

    .column-two{
      display: flex;
      justify-content: center;
      padding-top: 10px;

      .description{
        
        p{
          color: red;
          font-size: 12px;
        }
      }
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
    color: white;
  }
}
}

.form-tecnico{
display: flex;
flex-direction: column;
align-items: center;

.column{
  background-color: yellow;
  width: 250px;
}
button{
  width: 200px;
  height: 40px;
  background: #38a800;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  margin-top: 10px;

  &:hover{
    cursor: pointer;
    background: #38a80090;
    color: white;
  }
}

}
`;