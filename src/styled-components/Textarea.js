import styled from "styled-components";

const Textarea = styled.textarea`
  color: ${(props) => props.theme.primaryColor};
  font-family: ${(props) => props.theme.primaryFont};
  min-height: ${(props) => props.theme.maxWidth};
  display: block;
  width: 100%;
  margin: 16px 0;
`;

export default Textarea;
