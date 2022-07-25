import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const postId = useParams().postId;
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  const getPost = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${postId}`
    );
    let data = await response.json();

    data.author = data.author.username;
    return data;
  };

  const getComments = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`
    );
    let data = await response.json();

    data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

    data = data.map((item) => {
      item.date = item.publishedDate || item.creationDate;
      item.date = DateTime.fromISO(item.date).toLocaleString(DateTime.DATE_MED);
      item.author = item.author.username;
      return item;
    });

    return data;
  };

  const updateComments = () => {
    getComments().then((data) => setComments(data));
  };

  useEffect(() => {
    getPost().then((data) => setPost(data));
    updateComments();

    return () => {
      setPost(null);
      setComments(null);
    };
  }, []);

  return <h1>Hi!</h1>;
}

export default PostPage;
