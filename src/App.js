import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import AuthenticationPage from "./components/AuthenticationPage";
import Theme from "./theme";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const getUser = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      return;
    }
    let data = await response.json();
    return data;
  };

  const logOut = async () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (token === null) {
      setToken(JSON.parse(localStorage.getItem("token")));
      return;
    }
    if (JSON.parse(localStorage.getItem("token")) !== token) {
      localStorage.setItem("token", JSON.stringify(token));
      getUser(token).then((data) => setUser(data));
    }
  }, [token]);

  useEffect(() => {
    if (!user) {
      getUser(JSON.parse(localStorage.getItem("token"))).then((data) =>
        setUser(data)
      );
    }
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <AuthenticationPage />
    </ThemeProvider>
  );
}

export default App;
