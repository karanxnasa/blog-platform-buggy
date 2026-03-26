import CommentList from "../Comments/CommentList";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// BUG: Comment count crashes when post.comments is undefined
// Should be: post.comments?.length || 0
function getCommentCount(post) {
  return post.comments.length; // BUG: crashes if comments is undefined/null
}

export default function PostDetail({ post, onBack }) {
  if (!post) {
    return (
      <div style={{ padding: 24, textAlign: "center", color: "#888" }}>
        <p>No post selected. Click a post from the list to view details.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "1px solid #ddd",
          padding: "6px 14px",
          borderRadius: 4,
          cursor: "pointer",
          marginBottom: 24,
          fontSize: 14,
          color: "#555",
        }}
      >
        ← Back to Posts
      </button>

      <article>
        <h1 style={{ fontSize: 32, marginBottom: 8, color: "#1a1a1a", lineHeight: 1.3 }}>
          {post.title}
        </h1>

        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24, color: "#777", fontSize: 14 }}>
          <span>By {post.author}</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{getCommentCount(post)} comments</span>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "#f0f7ff",
                color: "#0070f3",
                padding: "3px 10px",
                borderRadius: 12,
                fontSize: 12,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "#333",
            borderTop: "1px solid #eee",
            paddingTop: 24,
            marginBottom: 32,
          }}
        >
          <p>{post.content}</p>
          <p style={{ marginTop: 16 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <p style={{ marginTop: 16 }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </div>

        <section>
          <h3 style={{ fontSize: 20, marginBottom: 16, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
            Comments ({getCommentCount(post)})
          </h3>
          <CommentList comments={post.comments || []} />
        </section>
      </article>
    </div>
  );
}
