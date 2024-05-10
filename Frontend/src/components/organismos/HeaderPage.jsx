import styled from "styled-components"

function HeaderPage({funcion, titulo, icon, iconButton}) {

  return (
    <Header>
    <div>
    {icon}
    <h3>{titulo}</h3>
    </div>
    <button title="Registrar" className="btn-register" onClick={() => funcion()}>{iconButton}</button>
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
    background: none;
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 50%;
    border: none;
    cursor: pointer;

    svg {
      font-size: 35px;
      color: #38a800;
    }

    &:hover{
      background: #e8e6e685;

    }

   
  }
  
`;
export default HeaderPage