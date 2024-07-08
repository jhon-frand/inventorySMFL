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
    border-radius: 20px;

     th{
      background: #38a800;
      color: white;
      padding: 10px;
     }
  }
  .table-two{
     width: 40%;
     border-radius: 20px;

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

.form-ubication{
  display: flex;
  flex-direction: column;
  align-items: center;

  .column{
    width: 250px;
  }

}
.form-unit{
  display: flex;
  flex-direction: column;
  align-items: center;

  .column{
    width: 250px;
  }
}







 


`;