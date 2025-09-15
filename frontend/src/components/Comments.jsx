import { useState, useEffect } from "react";
import { Form, Button, ListGroup, Card } from "react-bootstrap";
import API from "../api";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    API.get(`/comments/${postId}`).then((res) => setComments(res.data));
  }, [postId]);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post(
        `/comments/${postId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([data, ...comments]);
      setText("");
    } catch {
      alert("❌ You must log in to comment.");
    }
  };

  return (
    <Card className="p-3 mt-4 shadow-sm">
      <h5>💬 Comments</h5>
      <ListGroup>
        {comments.map((c) => (
          <ListGroup.Item key={c._id}>
            <strong>{c.author}</strong>: {c.text}
            <br />
            <small className="text-muted">
              {new Date(c.createdAt).toLocaleString()}
            </small>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form onSubmit={handleComment} className="mt-3">
        <Form.Control
          as="textarea"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
        />
        <Button type="submit" variant="primary" className="mt-2">
          Post Comment
        </Button>
      </Form>
    </Card>
  );
};

export default Comments;
