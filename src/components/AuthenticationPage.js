import Button from "../styled-components/Button";
import Form from "../styled-components/Form";
import Heading from "../styled-components/Heading";
import Input from "../styled-components/Input";

function AuthenticationPage() {
  return (
    <Form>
      <Heading>Log In</Heading>
      <Input placeholder="Username" name="username" />
      <Input placeholder="password" name="password" type="password" />
      <Button>Log In</Button>
    </Form>
  );
}

export default AuthenticationPage;
