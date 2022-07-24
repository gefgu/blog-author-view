import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
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

  const [posts, setPosts] = useState();

  const getPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
    let data = await response.json();

    data.sort(
      (a, b) =>
        new Date(b?.publishedDate || b.creationDate) -
        new Date(a?.publishedDate || a.creationDate)
    );

    data = data.map((item) => {
      let newItem = item;
      newItem.date = newItem.publishedDate || newItem.creationDate;
      newItem.date = DateTime.fromISO(newItem.date).toLocaleString(
        DateTime.DATE_MED
      );
      newItem.author = newItem.author.username;
      return newItem;
    });
    return data;
  };

  useEffect(() => {
    getPosts().then((data) => setPosts(data));

    return () => setPosts(null);
  }, []);

  return <h1>Hi!</h1>;
}

export default DashboardPage;
