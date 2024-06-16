import styled from "styled-components"
import { Link } from "react-router-dom";


function ContainerContent({titulo, icon, to, total}) {
  return (
    <Content>
      <div className="top-line"></div>
      <div className="contenido">
      <LinkStyled to={to}>
      <div className="content-info">
      <div className="content-icon">
      {icon}
      </div>
      <div className="info">
      <h2>{total}</h2>
      <span>{titulo}</span>
      </div>
       </div>
      </LinkStyled>
      </div>
    </Content>
  )
}

const Content = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
background-color: white;
padding-bottom: 10px;
flex-direction: column;
width: 230px;
min-height: 100px;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
color: #385c57;
box-shadow: 0 1px 1px 0 #38a800;

 &:hover{
  .top-line{
    background: #38a8005c;
    transition: all 0.5s ease-out;
  }
}

.top-line{
  width: 100%;
  height: 10px;
  background: #38a800b3;
}

.contenido{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

`;
const LinkStyled = styled(Link)`
  text-decoration: none;
  width: 100%;
  color: inherit; /*heredar el color del texto */

  .content-info{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 15px;
}

.content-icon{
  width: 60px;
  padding: 5px;
  display: flex;
  justify-content: center;

  svg{
      font-size: 35px;
      color: #00324d;
    }
}

.info{
  width: 100%;
    span{
      font-size: 16px;
    }

}
`;
export default ContainerContent