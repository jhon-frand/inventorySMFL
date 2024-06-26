import styled from "styled-components"

function HeaderPage({funcion, titulo, icon, text, iconButton}) {

  return (
    <Header>
    <div>
    {icon}
    <h3>{titulo}</h3>
    </div>
    <button title="Registrar" className="btn-register" onClick={() => funcion()}>
      {iconButton} {text}</button>
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
    background: #38a800;
    display: flex;
    align-items: center;
    padding: 10px;
    font-weight: bold;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: white;

    p{
      font-size: 15px;
      font-weight: bold;
    }

    svg {
      font-size: 25px;
    }

    &:hover{
      transition: all 0.3s;
      background: #38a800c1;

    }

   
  }
  
`;
export default HeaderPage