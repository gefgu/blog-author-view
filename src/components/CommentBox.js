import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Box from "../styled-components/Box";
import Button from "../styled-components/Button";
import ContentContainer from "../styled-components/ContentContainer";
import Paragraph from "../styled-components/Paragraph";

function CommentBox({ comment, postId, updateComments }) {
  const { token } = useContext(AuthContext);

  const handleDeletion = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${comment._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    updateComments();
  };

  return (
    <ContentContainer>
      <Box>
        <Paragraph>{comment.content}</Paragraph>

        <Button onClick={handleDeletion}>Delete</Button>

        <Paragraph align="end" size="0.9rem">
          By {comment.author} on {comment.date}
        </Paragraph>
      </Box>
    </ContentContainer>
  );
}

export default CommentBox;
