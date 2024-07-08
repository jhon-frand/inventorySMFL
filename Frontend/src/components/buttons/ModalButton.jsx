import styled from "styled-components"

function ModalButton({text}) {
  return (
    <ButtonModal type="submit">{text}</ButtonModal>
  )
}

const ButtonModal = styled.button`
  background-color: #38a800;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer; 
  transition: all ease-in 0.3s;
  width: 250px;
  margin-top: 10px;

  &:hover {
    background-color: #38a800df;
    box-shadow: 0px 0px 1px gray;
  }

`
export default ModalButton