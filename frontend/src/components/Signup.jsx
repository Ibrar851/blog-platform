import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import API from "../api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", { username, password });
      alert("✅ Signup successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Create Account</h3>
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Signup;
