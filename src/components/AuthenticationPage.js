import { useRef } from "react";
import Button from "../styled-components/Button";
import Form from "../styled-components/Form";
import Heading from "../styled-components/Heading";
import Input from "../styled-components/Input";

function AuthenticationPage({ setToken }) {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const jsonBody = {
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonBody),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <Form onSubmit={handleLogin}>
      <Heading>Log In</Heading>
      <Input placeholder="Username" name="username" ref={usernameInput} />
      <Input
        placeholder="password"
        name="password"
        type="password"
        ref={passwordInput}
      />
      <Button>Log In</Button>
    </Form>
  );
}

export default AuthenticationPage;
