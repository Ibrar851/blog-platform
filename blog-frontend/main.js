const API_URL = "http://localhost:5000/api"; // your backend URL

// ==========================
// Load all blog posts on homepage
// ==========================
async function loadPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`);
    const posts = await res.json();

    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    posts.forEach(post => {
      const snippet = post.content.length > 100 
        ? post.content.substring(0, 100) + "..." 
        : post.content;

      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <h2><a href="post.html?id=${post._id}">${post.title}</a></h2>
        <p>${snippet}</p>
        <small>By ${post.author} on ${new Date(post.date).toLocaleDateString()}</small>
      `;
      postsContainer.appendChild(postDiv);
    });
  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

// ==========================
// Load a single post + comments
// ==========================
async function loadSinglePost() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) return;

  try {
    // Fetch post
    const res = await fetch(`${API_URL}/posts/${postId}`);
    const post = await res.json();

    document.getElementById("post-title").innerText = post.title;
    document.getElementById("post-content").innerText = post.content;
    document.getElementById("post-meta").innerText =
      `By ${post.author} on ${new Date(post.date).toLocaleDateString()}`;

    // Fetch comments
    const commentsRes = await fetch(`${API_URL}/comments/${postId}`);
    const comments = await commentsRes.json();

    const commentsContainer = document.getElementById("comments");
    commentsContainer.innerHTML = "";
    comments.forEach(c => {
      const cDiv = document.createElement("div");
      cDiv.classList.add("comment");
      cDiv.innerHTML = `
        <p>${c.content}</p>
        <small>By ${c.userId} on ${new Date(c.date).toLocaleDateString()}</small>
      `;
      commentsContainer.appendChild(cDiv);
    });
  } catch (err) {
    console.error("Error loading post:", err);
  }
}

// ==========================
// Handle contact form
// ==========================
async function handleContactForm(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      alert("Message sent successfully!");
      e.target.reset();
    } else {
      alert("Failed to send message");
    }
  } catch (err) {
    console.error("Error submitting contact form:", err);
  }
}

// ==========================
// Init on page load
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("posts")) loadPosts();
  if (document.getElementById("post-title")) loadSinglePost();

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }
});
