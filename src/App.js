import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AuthenticationPage from "./components/AuthenticationPage";
import DashboardPage from "./components/DashboardPage";
import Navbar from "./components/Navbar";
import { AuthContext } from "./contexts/AuthContext";
import Theme from "./theme";
import "./styles/index.css";
import PostPage from "./components/PostPage";
import PostCreationPage from "./components/PostCreationPage";

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

  const handleLogin = async (username, password) => {
    const jsonBody = {
      username: username,
      password: password,
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
    const userIsAdmin = await isAdmin(data?.token);
    if (userIsAdmin) {
      setToken(data.token);
      return true;
    }
    return false;
  };

  const isAdmin = async (token) => {
    if (!token) return false;
    const data = await getUser(token);
    return data?.admin;
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
    <AuthContext.Provider value={{ user, token }}>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <Navbar logOut={logOut} />

          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route
              path="/login"
              element={<AuthenticationPage handleLogin={handleLogin} />}
            />
            <Route path="/posts/:postId" element={<PostPage />} />
            <Route path="/new-post" element={<PostCreationPage/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
