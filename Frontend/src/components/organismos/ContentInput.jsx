import styled from "styled-components"

function ContentInput({children}) {
  return (
    <Content>
        {children}
    </Content>
  )
}

const Content = styled.div`
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: white;
          height: 80px;
          padding: 5px;
          border-radius: 5px;
          gap: 3px;
          

          p{
            font-size: 12px;
            color: red;
          }
`;
export default ContentInput