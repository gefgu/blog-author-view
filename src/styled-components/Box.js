import styled from "styled-components";
import Button from "./Button";

const Box = styled.div`
  border: 1px solid ${(props) => props.theme.secondaryColor};
  border-radius: 0.25rem;
  padding: 12px;

  ${Button} {
    display: block;
    margin-left: auto;
  }
`;

export default Box;
