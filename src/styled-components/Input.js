import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  margin: 16px auto;
  padding: 12px;
  border: solid 1px ${(props) => props.theme.secondaryColor};
  border-radius: 0.25rem;
  font-family: ${(props) => props.theme.primaryFont};
  box-sizing: border-box;
`;

export default Input;
