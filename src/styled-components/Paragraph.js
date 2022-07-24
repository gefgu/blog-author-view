import styled, { css } from "styled-components";

const Paragraph = styled.p`
  font-size: ${(props) => props.size || "1.15rem"};
  margin-top: 16px;
  line-height: 2;
  text-align: ${(props) => props.align || "justify"};
  color: ${(props) => props.theme.primaryColor};
  font-family: ${(props) => props.theme.secondaryFont};

  ${(props) =>
    props.errorMessage &&
    css`
      color: red;
    `}
`;

export default Paragraph;
