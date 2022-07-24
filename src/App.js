import { ThemeProvider } from "styled-components";
import AuthenticationPage from "./components/AuthenticationPage";
import Theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <AuthenticationPage />
    </ThemeProvider>
  );
}

export default App;
