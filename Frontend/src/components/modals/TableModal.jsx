import styled from "styled-components"
import { IoMdClose } from "react-icons/io";
import MUIDatatable from "mui-datatables"
import { optionsTableModal } from "../styles/Table";

function TableModal({estado, cambiarEstado, columnas, datos, title, titulo}) {
  return (
    <>
   { estado && 
     <Overlay>
     <ContenedorModal>
         <EncabezadoModal>
             <h3>{titulo}</h3>
         </EncabezadoModal>
         <BotonCerrar onClick={() => cambiarEstado()} > <IoMdClose /></BotonCerrar>
         <MUIDatatable  className="table" 
         title={title}
         columns={columnas}
         data={datos}
         options={optionsTableModal}
         />
     </ContenedorModal>
 </Overlay>
   }
    </>
  )
}

const Overlay = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
position: fixed;
top: 0;
left: 0;
z-index: 30;
background: rgba(0, 0, 0, .5);
`;

const ContenedorModal = styled.div`
    width: 70%;
    min-height: 200px;
    background: white;
    position: relative;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 5px white;

    .table{
        padding: 5px;
        th{
            background: #38a800;
            color: white;
        }
    }

`;

const EncabezadoModal = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;

    h3{
        font-size: 16px;
        font-weight: 600;
        color: black;
    }
`;

const BotonCerrar = styled.button`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 15px;
    right: 20px;
    font-size: 20px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    background: none;
    border-radius: 5px;

    &:hover{
        background: #ff0000c3;
        color: white;
    }
`;
export default TableModal