import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";
import API from "../api";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchPost = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);
      setPost(data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await API.get(`/comments/${id}`);
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to comment!");
      return;
    }

    try {
      const { data } = await API.post(
        `/comments/${id}`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => [data, ...prev]);
      setNewComment("");
    } catch (err) {
      alert("Failed to post comment");
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="mt-5"style={{ maxWidth: "1000px" }}>
      {/* Post */}
      <Card className="shadow-sm mb-4 mx-auto">
        {post.image && (
          <Card.Img
            variant="top"
            src={`http://localhost:5000/uploads/${post.image}`}
            alt={post.title}
          />
        )}
        <Card.Body>
          <Card.Title className="fw-bold">{post.title}</Card.Title>
          <small className="text-muted">
            By <strong>{post.author}</strong> on{"7d"}
            {new Date(post.createdAt).toLocaleString()}
          </small>
        </Card.Body>
      </Card>

      {/* Comments */}
      <Card
        className="shadow-sm d-flex justify-content-center mt-5 mx-auto text-center"
        style={{ maxWidth: "1000px" }}
      >
        <Card.Body>
          <h5 className="mb-3">Comments</h5>
          {comments.length === 0 ? (
            <p className="text-muted">No comments yet.</p>
          ) : (
            <ListGroup className="mb-3">
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
          )}

          {/* Add Comment */}
          <Form onSubmit={handleCommentSubmit}>
            <Form.Control
              as="textarea"
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              required
            />
            <Button type="submit" variant="primary" className="mt-2 w-100">
              Post Comment
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostDetails;
