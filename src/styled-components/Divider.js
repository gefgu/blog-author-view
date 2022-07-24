import styled from "styled-components";

const Divider = styled.hr`
  width: 100%;
  margin: 8px 0;
  border: 1px solid ${(props) => props.theme.secondaryColor};
  opacity: 0.4;
`

export default Divider;