import styled from "styled-components"

function ButtonStatus({text, funcion}) {
  return (
    <Button $estado={text} onClick={() => funcion()}>
        {text}
    </Button>
  )
}

const Button = styled.button`
background: ${({$estado}) => ($estado ==="activo" ? "#38a800" : "#cb7755")};
border: none;
padding: 4px;
width: 80px;
border-radius: 5px;
color: white;
font-size: 14px;
cursor: pointer;
&:hover{
    background: ${({$estado}) => ($estado ==="activo" ? "#286e05" : "#a8502a")};
}
`;

export default ButtonStatus