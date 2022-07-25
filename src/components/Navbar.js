import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Anchor from "../styled-components/Anchor";
import Button from "../styled-components/Button";
import Flex from "../styled-components/Flex";
import Nav from "../styled-components/Nav";
import SubHeading from "../styled-components/SubHeading";

function Navbar({ logOut }) {
  const { user } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (!user?.admin) {
      navigate("/login");
    }
  }, [user]);

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
          <Anchor>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </Anchor>
        </Flex>
      )}
    </Nav>
  );
}

export default Navbar;
