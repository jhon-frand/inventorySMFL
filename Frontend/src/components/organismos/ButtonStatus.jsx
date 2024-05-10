import styled from "styled-components"
import { FaUserCheck } from "react-icons/fa6";
import { FaUserTimes } from "react-icons/fa";

function ButtonStatus({text, funcion}) {

  return (
    <Button title={text} $estado={text} onClick={() => funcion()}>
     
        { text && text === "activo" &&(
          <FaUserCheck />
        )}
        { text && text === "inactivo" &&(
          <FaUserTimes />
        )}
    </Button>
  )
}

const Button = styled.button`
background: ${({$estado}) => ($estado ==="activo" ? "#38a800" : "#cb7755")};
border: none;
padding: 2px;
width: 80px;
border-radius: 5px;
color: white;
cursor: pointer;

svg{
  font-size: 20px;
}

&:hover{
    background: ${({$estado}) => ($estado ==="activo" ? "#286e05" : "#a8502a")};
}
`;

export default ButtonStatus