import { useState } from "react";
import styled from "styled-components"
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

function MediumContainer({children}) {
    const [show, setShow] = useState(false);
  return (

    <Category show={show}>
    <button onClick={() => setShow(true)} className="btns open"><BiSolidLeftArrow /></button>
        {show && (
          <>
          <button onClick={() => setShow(false)} className="btns"><BiSolidRightArrow /></button>
          {children}
          </>
        )}
      </Category>
  )
}

const Category = styled.div`
  height: 450px;
  width: ${({ show }) => (show ? "500px" : "30px")};
  border-radius: 5px;
  position: absolute;
  right: 0;
  transition: width 0.8s;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .btns{
    position: absolute;
    top: 45%;
    left: -1px;
    border: none;
    background: none;
    color: #cb7755;
    border-radius: 50%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;

    svg{
        font-size: 22px;
    }
  }
  .open{
    transition: all 0.8s;
    display:${({ show }) => (show ? "none" : "block")};

    svg{
      font-size: 22px;
      border-left: 2px solid #cb7755;
  }
  }
`;
export default MediumContainer