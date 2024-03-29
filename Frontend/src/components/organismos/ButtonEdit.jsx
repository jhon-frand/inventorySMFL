import styled from "styled-components"

function ButtonEdit({funcion1}) {
  return (
    <Styledbutton className="button-edit" onClick={() => funcion1()} >EDIT</Styledbutton>
  )
}

const Styledbutton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 80px;
padding: 8px;
background: #385c57;
color: white;
font-weight: 600;
border: none;
border-radius: 5px;

&:hover {
  cursor: pointer;
  background: #00324d;
}
`;

export default ButtonEdit