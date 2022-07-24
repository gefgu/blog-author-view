import styled from "styled-components";

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: ${(props) => props.theme.primaryColor};
  font-family: ${(props) => props.theme.primaryFont};
  margin: 0;
`;

export default Title;
