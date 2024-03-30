import { FaAccusoft } from "react-icons/fa";
import styled from "styled-components"
import { Link } from "react-router-dom";

function ContainerContent({titulo, icon, to, total}) {
  return (
    <Content>
      <LinkStyled to={to}>
      <div>
       <h3>{titulo}</h3>
        {icon}
        <span>{total}</span>
       </div>
      </LinkStyled>
    </Content>
  )
}

const Content = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 250px;
background: #385c57;
min-height: 100px;
border-radius: 20px;
color: white;

div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    gap: 5px;

    h3{
        font-size: 14px;
        text-align: center;
    }

}
&:hover{
    background: #4e7e77;
    color: white;
}
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit; /*heredar el color del texto */
`;
export default ContainerContent