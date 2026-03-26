// BUG: Content is truncated at 20 characters instead of 100
// Should be: post.content.slice(0, 100)
function truncateContent(content) {
  if (content.length <= 20) return content;
  return content.slice(0, 20) + "..."; // Wrong: should be 100, not 20
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function PostCard({ post, onClick }) {
  return (
    <div
      onClick={() => onClick && onClick(post)}
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        padding: 20,
        cursor: onClick ? "pointer" : "default",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)")}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 18, color: "#1a1a1a" }}>{post.title}</h3>
        <span style={{ fontSize: 12, color: "#888", whiteSpace: "nowrap", marginLeft: 12 }}>
          {formatDate(post.date)}
        </span>
      </div>

      <p style={{ color: "#555", fontSize: 14, lineHeight: 1.6, margin: "8px 0" }}>
        {truncateContent(post.content)}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#0070f3",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {post.author.charAt(0)}
          </div>
          <span style={{ fontSize: 13, color: "#666" }}>{post.author}</span>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                background: "#f0f7ff",
                color: "#0070f3",
                padding: "2px 8px",
                borderRadius: 12,
                fontSize: 11,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
