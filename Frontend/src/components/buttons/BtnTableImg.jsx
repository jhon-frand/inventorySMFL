import styled from 'styled-components'

function BtnTableImg({funcion1}) {

return 
  (
    <BtnImage onClick={() => funcion1()}>
        Ver imagen
    </BtnImage>
  )
}

const BtnImage = styled.button`
background-color: #38a800;
`;

export default BtnTableImg