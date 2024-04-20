import styled from "styled-components"

function ButtonEdit({funcion1, titulo}) {
  return (
    <Styledbutton  onClick={() => funcion1()} >{titulo}</Styledbutton>
  )
}

const Styledbutton = styled.button`
display: flex;
justify-content: center;
align-items: center;
min-width: 80px;
padding: 5px;
background: #385c57;
color: white;
font-weight: 600;
border: none;
border-radius: 5px;
font-size: 12px;

&:hover {
  cursor: pointer;
  background: #00324d;
}
`;

export default ButtonEdit