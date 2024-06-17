import styled from "styled-components"
import { AiOutlinePlus } from "react-icons/ai";

function HeaderPageMante({funcion1, funcion2, titulo, textButton1, textButton2, icon}) {

  return (
    <Header>
    <div>
    {icon}
    <h3>{titulo}</h3>
    </div>
  <div>
    <button className="btn-register" onClick={() => funcion1()} ><AiOutlinePlus />{textButton1}</button>
    <button className="btn-register" onClick={() => funcion2()} ><AiOutlinePlus />{textButton2}</button>
  </div>
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
        font-size: 20px;
        color: #385c57;
      }

      h3{
        color: #385c57;
        font-size: 16px;
      }
    }
  .btn-register{
    background: #38a800;
    color: white;
    padding: 10px;
    font-weight: bold;
    font-size: 13px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    svg{
      color: white;
      font-size: 25px;
    }

    &:hover{
        transition: all 0.3s;
        background: #38a800c1;
    }
  }
  a{
    text-decoration: none;
    color: white;
  }
`;
export default HeaderPageMante