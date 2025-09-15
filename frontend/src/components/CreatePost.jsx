import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import API from "../api";

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create a post");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);

      const { data } = await API.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setImage(null);
      if (onPostCreated) onPostCreated(data);
      alert("✅ Post created successfully!");
    } catch (err) {
      alert(" Failed to create post");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Card
        className="shadow-sm p-4 w-100"
        style={{ maxWidth: "1000px", borderRadius: "12px" }}>
        <h3 className="mb-4 text-center">🖼️ Create a New Post</h3>
        <Form onSubmit={handleSubmit}>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Post Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging title..."
              required
            />
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <div className="d-grid">
            <Button
              type="submit"
              variant="warning"
              className="fw-bold"
              style={{ borderRadius: "8px" }}
            >
              🚀 Publish Post
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CreatePost;
