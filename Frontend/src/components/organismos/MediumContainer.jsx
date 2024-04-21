import { useState } from "react";
import styled from "styled-components"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function MediumContainer({children}) {
    const [show, setShow] = useState(false);
  return (

    <Category $show={show}>
    <button onClick={() => setShow(true)} className="btns open"><AiOutlineLeft /></button>
        {show && (
          <>
          <button onClick={() => setShow(false)} className="btns"><AiOutlineRight /></button>
          {children}
          </>
        )}
      </Category>
  )
}

const Category = styled.div`
  height: 550px;
  top: 100px;
  width: ${({ $show }) => ($show ? "60%" : "35px")};
  border-radius: 5px;
  position: absolute;
  right: 0;
  transition: width 0.8s;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 10px;

  .btns{
    position: absolute;
    top: 45%;
    left: 2px;
    border: none;
    background: #38a800;
    width: 30px;
    height: 30px;
    border-radius: 20px 0 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px #38A800;
    cursor: pointer;

    svg{
        font-size: 18px;
        color: white;
        
    }
  }
  .open{
    transition: all 0.8s;
    display:${({ $show }) => ($show ? "none" : "block")};
  }
`;
export default MediumContainer