import styled from "styled-components"

function ButtonEdit({funcion1, icon, titulo}) {
  return (
    <Styledbutton title={titulo}  onClick={() => funcion1()} >{icon}</Styledbutton>
  )
}

const Styledbutton = styled.button`
display: flex;
align-items: center;
padding: 5px;
background: none;
border: none;
border-radius: 50%;

svg{
  font-size: 25px;
  color: gray;
}

&:hover {
  cursor: pointer;
  background: #d9d9d9dc;

  svg{
  font-size: 25px;
  color: #38a800;
}

}
`;

export default ButtonEdit