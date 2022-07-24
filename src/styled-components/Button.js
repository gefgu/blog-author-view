import styled from "styled-components";

const Button = styled.button`
  margin: 0;
  padding: 8px 16px;
  border: solid 1px ${(props) => props.theme.secondaryColor};
  border-radius: 0.25rem;
  font-size: 1rem;
  letter-spacing: 1px;
  font-family: ${(props) => props.theme.primaryFont};
  background-color: ${(props) => props.theme.primaryBackground};

  :hover {
    background-color: ${(props) => props.theme.secondaryBackground};
  }

  :active {
    background-color: ${(props) => props.theme.terciaryBackground};
  }
`;

export default Button;
