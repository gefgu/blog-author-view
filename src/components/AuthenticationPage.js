import { useRef, useState } from "react";
import Button from "../styled-components/Button";
import Form from "../styled-components/Form";
import Heading from "../styled-components/Heading";
import Input from "../styled-components/Input";
import Paragraph from "../styled-components/Paragraph";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function AuthenticationPage({ handleLogin }) {
  const { user } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (!user?.admin) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [user]);

  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const [errorMessage, setErrorMessage] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loginIsSuccessful = await handleLogin(
      usernameInput.current.value,
      passwordInput.current.value
    );
    if (!loginIsSuccessful) {
      setErrorMessage("Unauthorized.");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Heading>Log In</Heading>
      <Paragraph>Try: username: "jeff" and password: "password7" </Paragraph>
      <Input placeholder="Username" name="username" ref={usernameInput} />
      <Input
        placeholder="password"
        name="password"
        type="password"
        ref={passwordInput}
      />
      <Button>Log In</Button>
      {errorMessage && <Paragraph errorMessage>{errorMessage}</Paragraph>}
    </Form>
  );
}

export default AuthenticationPage;
