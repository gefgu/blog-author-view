import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ContentContainer from "../styled-components/ContentContainer";
import Header from "../styled-components/Header";
import OuterWrapper from "../styled-components/OuterWrapper";
import Subtitle from "../styled-components/Subtitle";
import Title from "../styled-components/Title";
import Divider from "../styled-components/Divider";
import PostPreview from "./PostPreview";

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
      if (newItem?.publishedDate) {
        newItem.publishedDate = DateTime.fromISO(
          newItem.publishedDate
        ).toLocaleString(DateTime.DATETIME_MED);
      }

      newItem.creationDate = DateTime.fromISO(
        newItem.creationDate
      ).toLocaleString(DateTime.DATE_MED);
      newItem.author = newItem.author.username;
      return newItem;
    });
    return data;
  };

  const updatePosts = () => {
    getPosts().then((data) => setPosts(data));
  };

  useEffect(() => {
    updatePosts();

    return () => setPosts(null);
  }, []);

  return (
    <OuterWrapper>
      <Header>
        <Title>Blog</Title>
        <Subtitle>Thougths, stories and ideas.</Subtitle>
      </Header>
      <ContentContainer>
        <Divider />
        {posts &&
          posts.map((post) => {
            return (
              <div key={post._id}>
                <PostPreview post={post} updatePosts={updatePosts} />
                <Divider />
              </div>
            );
          })}
      </ContentContainer>
    </OuterWrapper>
  );
}

export default DashboardPage;
