import styled from "styled-components"
import { IoMdClose } from "react-icons/io";

function ModalImg({children,estado, cambiarEstado}) {
  return (
    <>
   { estado && 
     <Overlay>
     <ContenedorModal>
         <BotonCerrar onClick={() => cambiarEstado()} > <IoMdClose /> </BotonCerrar>
         {children}
     </ContenedorModal>
 </Overlay>
   }
    </>
  )
}

export default ModalImg

const Overlay = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
position: fixed;
top: 0;
left: 0;
background: rgba(0, 0, 0, .5);
z-index: 30;
`;

const ContenedorModal = styled.div`
    width: 50vh;
    height: 60vh;
    position: relative;
    display: flex;
    padding: 5px;

        img{
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
`;

const BotonCerrar = styled.button`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    font-size: 20px;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    background: white;

    &:hover{
        background: #ff0000c3;
        color: white;
    }
`;