import { DateTime } from "luxon";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../styled-components/Button";
import Form from "../styled-components/Form";
import Header from "../styled-components/Header";
import Input from "../styled-components/Input";
import Label from "../styled-components/Label";
import OuterWrapper from "../styled-components/OuterWrapper";
import Textarea from "../styled-components/Textarea";
import Title from "../styled-components/Title";

function PostPage() {
  const { token } = useContext(AuthContext);
  let navigate = useNavigate();

  const postId = useParams().postId;
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  const titleInput = useRef();
  const publishedDateInput = useRef();
  const publishedTimeInput = useRef();
  const contentInput = useRef();

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const time = publishedTimeInput.current.value;
    const date = DateTime.fromISO(
      `${publishedDateInput.current.value}T${time.split(":")[0]}:${
        time.split(":")[1]
      }`
    ).toISO(); // ISO time format

    console.log(date);

    const content = {
      title: titleInput.current.value,
      publishedDate: date,
      content: contentInput.current.value,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${postId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data?.post) {
      navigate(`/`);
    }
  };

  return (
    <OuterWrapper>
      <Header>
        <Title>Post Edit Page</Title>
      </Header>
      {post && (
        <Form onSubmit={handleFormSubmit}>
          <Label>
            {" "}
            Title:
            <Input
              name="title"
              placeholder="Title"
              defaultValue={post?.title}
              ref={titleInput}
              required
            />
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
              ref={publishedDateInput}
              required
            />
          </Label>
          <Label>
            {" "}
            Published Time:
            <Input
              name="publishedTime"
              type="time"
              defaultValue={DateTime.fromISO(
                post?.publishedDate
              ).toLocaleString(DateTime.TIME_24_SIMPLE)}
              ref={publishedTimeInput}
              required
            />
          </Label>
          <Label>
            {" "}
            Content:
            <Textarea
              name="content"
              placeholder="Content"
              defaultValue={post?.content}
              ref={contentInput}
              required
            ></Textarea>
          </Label>
          <Button>Submit</Button>
        </Form>
      )}
    </OuterWrapper>
  );
}

export default PostPage;
