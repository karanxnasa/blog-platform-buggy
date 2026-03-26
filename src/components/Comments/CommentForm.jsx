import { useState } from "react";

// BUG: Empty comment can be submitted — no validation on comment text
// Should have: if (!comment.trim()) { setError("Comment cannot be empty"); return; }
export default function CommentForm({ onSubmit, postId }) {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // BUG: Missing validation — empty whitespace-only comment will be submitted
    // Should check: if (!comment.trim()) { setError("Comment cannot be empty"); return; }

    if (!author.trim()) {
      setError("Please enter your name");
      return;
    }

    setError("");
    const newComment = {
      id: Date.now(),
      text: comment,
      author: author.trim(),
      date: new Date().toISOString().split("T")[0],
      postId,
      replies: [],
    };

    if (onSubmit) onSubmit(newComment);
    setComment("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ marginTop: 24, padding: 20, background: "#f9f9f9", borderRadius: 8, border: "1px solid #eee" }}>
      <h4 style={{ margin: "0 0 16px", fontSize: 16 }}>Leave a Comment</h4>

      {submitted && (
        <div style={{ padding: "8px 12px", background: "#d4edda", color: "#155724", borderRadius: 4, marginBottom: 12, fontSize: 14 }}>
          Comment posted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4, fontSize: 14 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            rows={4}
            style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4, fontSize: 14, resize: "vertical" }}
          />
        </div>

        {error && <p style={{ color: "red", fontSize: 12, marginBottom: 8 }}>{error}</p>}

        <button
          type="submit"
          style={{ padding: "8px 20px", background: "#0070f3", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 14 }}
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}
