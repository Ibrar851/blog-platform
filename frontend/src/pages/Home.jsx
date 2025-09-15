import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../api";
import CreatePost from "../components/CreatePost";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await API.get("/posts");
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container className="mt-4" style={{ maxWidth: "1000px" }}>
      <h2 className="d-flex justify-content-center align-items-center mt-5">
        All Posts
      </h2>

      <CreatePost onPostCreated={(newPost) => setPosts([newPost, ...posts])} />

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <Card key={post._id} className="mb-3 mt-4">
            <Card.Body>
              <Card.Title>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </Card.Title>

              {/* 👇 Image show karna */}
              {post.image && (
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={post.title}
                  className="mb-3"
                />
              )}

              <small>
                By {post.author} on{" "}
                {new Date(post.createdAt).toLocaleString()}
              </small>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Home;
