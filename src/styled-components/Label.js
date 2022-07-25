import styled from "styled-components";

const Label = styled.label`
  text-transform: uppercase;
  color: ${(props) => props.theme.primaryColor};
  font-family: ${(props) => props.theme.primaryFont};
`;

export default Label;
