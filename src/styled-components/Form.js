import styled from "styled-components";
import Button from "./Button";

const Form = styled.form`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 48px auto;

  ${Button} {
    display: block;
    margin-left: auto;
  }
`;

export default Form;
