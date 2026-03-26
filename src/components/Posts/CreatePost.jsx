import { useState } from "react";

const TAGS = ["react", "javascript", "css", "nodejs", "typescript", "ai", "python", "backend", "frontend"];

// BUG: Empty title is allowed — form submits without any title
// Should have: if (!title.trim()) { setErrors({ title: "Title is required" }); return; }
function validatePost(title, content) {
  const errs = {};
  // Missing title validation — title.trim() check is absent
  if (!content.trim()) errs.content = "Content cannot be empty";
  if (content.trim().length < 50) errs.content = "Content must be at least 50 characters";
  return errs;
}

export default function CreatePost({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // BUG: Title emptiness not checked — any blank title passes through
    const errs = validatePost(title, content);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const newPost = {
      id: Date.now(),
      title,
      content,
      tags: selectedTags,
      date: new Date().toISOString().split("T")[0],
      author: "Current User",
      comments: [],
    };

    setSubmitted(true);
    setTitle("");
    setContent("");
    setSelectedTags([]);

    if (onSubmit) onSubmit(newPost);
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h3>Post Published!</h3>
        <p style={{ color: "#666" }}>Your post has been submitted successfully.</p>
        <button
          onClick={() => setSubmitted(false)}
          style={{ marginTop: 16, padding: "8px 20px", background: "#0070f3", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
        >
          Write Another Post
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 20 }}>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4, fontSize: 16 }}
            placeholder="Enter post title..."
          />
          {errors.title && <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>{errors.title}</p>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4, fontSize: 14, resize: "vertical" }}
            placeholder="Write your post content here..."
          />
          {errors.content && <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>{errors.content}</p>}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>Tags</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 12,
                  border: "1px solid",
                  cursor: "pointer",
                  fontSize: 12,
                  background: selectedTags.includes(tag) ? "#0070f3" : "#f5f5f5",
                  color: selectedTags.includes(tag) ? "#fff" : "#555",
                  borderColor: selectedTags.includes(tag) ? "#0070f3" : "#ddd",
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{ width: "100%", padding: 12, background: "#0070f3", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 15, fontWeight: 500 }}
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}
