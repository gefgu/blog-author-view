import styled from "styled-components";

const SubHeading = styled.h4`
  font-size: 1rem;
  font-weight: lighter;
  margin: 8px 0;
  color: ${(props) => props.theme.secondaryColor};
  font-family: ${(props) => props.theme.secondaryFont};
`;

export default SubHeading;
