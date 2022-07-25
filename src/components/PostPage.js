import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../styled-components/Form";
import Header from "../styled-components/Header";
import Input from "../styled-components/Input";
import Label from "../styled-components/Label";
import OuterWrapper from "../styled-components/OuterWrapper";
import Textarea from "../styled-components/Textarea";
import Title from "../styled-components/Title";

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
    console.log(data);
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

  return (
    <OuterWrapper>
      <Header>
        <Title>Post Edit Page</Title>
      </Header>
      {post && (
        <Form>
          <Label>
            {" "}
            Title:
            <Input name="title" placeholder="Title" defaultValue={post?.title} />
          </Label>
          <Label>
            {" "}
            Published Date:
            <Input
              name="publishedDate"
              type="date"
              defaultValue={`${
                DateTime.fromISO(post?.publishedDate).year
              }-${DateTime.fromISO(post?.publishedDate).toLocaleString({
                month: "2-digit",
              })}-${DateTime.fromISO(post?.publishedDate).day}`}
            />
          </Label>
          <Label>
            {" "}
            Content:
            <Textarea
              name="content"
              placeholder="Content"
              defaultValue={post?.content}
            ></Textarea>
          </Label>
        </Form>
      )}
    </OuterWrapper>
  );
}

export default PostPage;
