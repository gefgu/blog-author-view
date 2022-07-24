import styled from "styled-components";

const Nav = styled.nav`
  margin-left: calc((100% - ${(props) => props.theme.maxWidth}) / 2);
  margin-right: calc((100% - ${(props) => props.theme.maxWidth}) / 2);
  padding: 12px 0;
  align-items: center;
  justify-content: space-between;
  display: flex;
`;

export default Nav;
