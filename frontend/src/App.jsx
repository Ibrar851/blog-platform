import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
import Home from "./pages/Home"; // 👈 import Home
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />   {/* 👈 Home default */}
        <Route path="/create" element={<CreatePost />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
