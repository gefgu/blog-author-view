import Anchor from "../styled-components/Anchor";
import ContentContainer from "../styled-components/ContentContainer";
import Heading from "../styled-components/Heading";
import Paragraph from "../styled-components/Paragraph";
import SubHeading from "../styled-components/SubHeading";
import { Link } from "react-router-dom";
import Button from "../styled-components/Button";
import Flex from "../styled-components/Flex";

function PostPreview({ post }) {
  return (
    <ContentContainer>
      <Flex>
        <Anchor>
          <Link to={`/posts/${post._id}`}>
            <Heading> {post.title}</Heading>
          </Link>
        </Anchor>
        <Button>Delete</Button>
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
