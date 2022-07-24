import styled from "styled-components";

const ContentContainer = styled.article`
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  flex-direction: column;
  margin: 48px auto;
`;

export default ContentContainer;
