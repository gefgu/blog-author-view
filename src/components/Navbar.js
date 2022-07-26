import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Anchor from "../styled-components/Anchor";
import Button from "../styled-components/Button";
import Flex from "../styled-components/Flex";
import Nav from "../styled-components/Nav";
import SubHeading from "../styled-components/SubHeading";

function Navbar({ logOut }) {
  const { user } = useContext(AuthContext);

  return (
    <Nav>
      <Anchor>
        <Link to="/">Home</Link>
      </Anchor>
      {user && (
        <Anchor>
          <Link to="/new-post">
            <Button>+ Create New Post</Button>
          </Link>
        </Anchor>
      )}
      {user ? (
        <Flex>
          <SubHeading>{user.username}</SubHeading>
          <Button onClick={logOut}>Log Out</Button>
        </Flex>
      ) : (
        <Flex>
          <Anchor>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </Anchor>
        </Flex>
      )}
    </Nav>
  );
}

export default Navbar;
