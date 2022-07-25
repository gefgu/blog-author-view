import Anchor from "../styled-components/Anchor";
import ContentContainer from "../styled-components/ContentContainer";
import Heading from "../styled-components/Heading";
import Paragraph from "../styled-components/Paragraph";
import SubHeading from "../styled-components/SubHeading";
import { Link } from "react-router-dom";
import Button from "../styled-components/Button";
import Flex from "../styled-components/Flex";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function PostPreview({ post, updatePosts }) {
  const { token } = useContext(AuthContext);

  const handleDeletion = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/posts/${post._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    updatePosts();
  };

  return (
    <ContentContainer>
      <Flex>
        <Anchor>
          <Link to={`/posts/${post._id}`}>
            <Heading> {post.title}</Heading>
          </Link>
        </Anchor>
        <Button onClick={handleDeletion}>Delete</Button>
      </Flex>
      <SubHeading>By {post.author}</SubHeading>
      <SubHeading>
        Published Date: {post.publishedDate || "undefined"}
      </SubHeading>
      <SubHeading>Creation Date: {post.creationDate}</SubHeading>
      <Paragraph>{post.content.slice(0, 200)}...</Paragraph>
    </ContentContainer>
  );
}

export default PostPreview;
