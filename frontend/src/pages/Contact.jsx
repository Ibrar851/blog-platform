import { Container, Form, Button } from "react-bootstrap";

const Contact = () => (
  <Container className="mt-4">
    <h2>Contact Us</h2>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Your message..." />
      </Form.Group>
      <Button type="submit">Send</Button>
    </Form>
  </Container>
);

export default Contact;
