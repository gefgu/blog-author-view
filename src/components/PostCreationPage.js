import { DateTime } from "luxon";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../styled-components/Button";
import Form from "../styled-components/Form";
import Header from "../styled-components/Header";
import Input from "../styled-components/Input";
import Label from "../styled-components/Label";
import OuterWrapper from "../styled-components/OuterWrapper";
import Textarea from "../styled-components/Textarea";
import Title from "../styled-components/Title";

function PostCreationPage() {
  const { token } = useContext(AuthContext);
  let navigate = useNavigate();

  const titleInput = useRef();
  const publishedDateInput = useRef();
  const publishedTimeInput = useRef();
  const contentInput = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let time = publishedTimeInput.current?.value;
    let dateValue = publishedDateInput.current?.value;
    let date;

    if (!time && !dateValue) {
      date = null;
    } else {
      time = time || "00:00";
      dateValue = dateValue || DateTime.now().toISODate();

      date = DateTime.fromISO(
        `${dateValue}T${time.split(":")[0]}:${time.split(":")[1]}`
      ).toISO();
    }

    console.log(date);

    const content = {
      title: titleInput.current.value,
      publishedDate: date,
      content: contentInput.current.value,
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });

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
      <Form onSubmit={handleFormSubmit}>
        <Label>
          {" "}
          Title:
          <Input name="title" placeholder="Title" ref={titleInput} required />
        </Label>
        <Label>
          {" "}
          Published Date: (Leave empty for draft)
          <Input name="publishedDate" type="date" ref={publishedDateInput} />
        </Label>
        <Label>
          {" "}
          Published Time: (Leave empty for draft)
          <Input name="publishedTime" type="time" ref={publishedTimeInput} />
        </Label>
        <Label>
          {" "}
          Content:
          <Textarea
            name="content"
            placeholder="Content"
            ref={contentInput}
            required
          ></Textarea>
        </Label>
        <Button>Submit</Button>
      </Form>
    </OuterWrapper>
  );
}

export default PostCreationPage;
