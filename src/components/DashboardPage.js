import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function DashboardPage() {
  const { user } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (!user?.admin) {
      navigate("/login");
    }
  }, [user]);

  return <h1>Hi!</h1>;
}

export default DashboardPage;
