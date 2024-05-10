import styled from "styled-components"

function ButtonEdit({funcion1, icon}) {
  return (
    <Styledbutton title="Actualizar"  onClick={() => funcion1()} >{icon}</Styledbutton>
  )
}

const Styledbutton = styled.button`
display: flex;
align-items: center;
padding: 5px;
background: none;
color: white;
border: none;
border-radius: 50%;

svg{
  font-size: 25px;
  color: #00324d;
}

&:hover {
  cursor: pointer;
  background: #d9d9d9b0;
}
`;

export default ButtonEdit