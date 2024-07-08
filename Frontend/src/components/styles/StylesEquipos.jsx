import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-width: 100%;

.table-mui{
display: flex;
gap: 20px;

  .category-graphic{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    width: 60%;
    height: 40%;
    padding: 20px;

    h2{
      color: #153f39;
    }
  }


  .table{
     width: 100%;
     border-radius: 20px;

     th{
      background: #38a800;
      color: white;
      padding: 5px;
     }
     
     .btns-edit{
      display: flex;
      justify-content: center;
      gap: 10px;

      .icon-activity{
    font-size: 30px;
    color: gray;
    cursor: pointer;

    &:hover{
      color: #38A800;
    }
  }
     
    
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

}
.filas{
  display: flex;
  flex-direction: column;

  .content-one{
    display: flex;

    .input-description{
      padding-top: 12px;
      display: flex;
      flex-direction: column;

      p{
        font-size: 12px;
        color: red;
      }
      
    }
  }

  
}

.filas-three{
  .description{    
    p{
      font-size: 12px;
        color: red;
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
}
`;