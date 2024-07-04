import styled from "styled-components"

function MenuList() {
  return (
    <ContentMenu>
        <span>Editar datos</span>
        <span>Registrar Mantenimiento</span>
        <span>Ver mantenimientos</span>
        <span>Cambiar estado</span>
    </ContentMenu>
  )
}


const ContentMenu = styled.div`
background-color: red;
display: flex;
flex-direction: column;
  padding: 5px;
  gap: 5px;
  cursor: pointer;
  
  span{
    background-color: white;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    border-radius: 10px;
  }


`;
export default MenuList