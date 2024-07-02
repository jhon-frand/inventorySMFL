import styled from "styled-components"

function ModalButton({text}) {
  return (
    <ButtonModal type="submit">{text}</ButtonModal>
  )
}

const ButtonModal = styled.button`
  background-color: #38a800df;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer; 
  transition: all ease-in 0.3s;

  &:hover {
    background-color: #38a800;
    box-shadow: 0px 0px 1px gray;
  }

`
export default ModalButton