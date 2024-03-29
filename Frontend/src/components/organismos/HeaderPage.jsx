import styled from "styled-components"

function HeaderPage({funcion, titulo, textButton, icon}) {

  return (
    <Header>
    <div>
    {icon}
    <h3>{titulo}</h3>
    </div>
    <button className="btn-register" onClick={() => funcion()} >{textButton}</button>
  </Header>
  )
}

const Header = styled.div`
    display: flex;
    background: white;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 10px;
    height: 60px;
  
    div{
      display: flex;
      align-items: center;
      border-radius: 10px;
      padding: 10px;
      gap: 10px;

      svg{
        font-size: 25px;
        color: #385c57;
      }

      h3{
        color: #385c57;
      }
    }
  .btn-register{
    background: #38A800;
    color: white;
    padding: 15px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    &:hover{
      background: #385c57;
    }
  }
  
`;
export default HeaderPage