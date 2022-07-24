import styled from "styled-components";

const Subtitle = styled.h1`
  font-size: 2rem;
  line-height: 1.5;
  font-weight: lighter;
  color: ${(props) => props.theme.secondaryColor};
  font-family: ${(props) => props.theme.secondaryFont};
  margin: 0;
`;

export default Subtitle;
