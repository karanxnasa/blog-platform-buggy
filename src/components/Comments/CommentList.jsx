// BUG: Nested comments (replies) are never rendered — only top-level comments shown
// Should recursively render comment.replies using the same CommentList component
// Fix: Add {comment.replies?.length > 0 && <CommentList comments={comment.replies} depth={depth + 1} />}

function Comment({ comment, depth = 0 }) {
  return (
    <div
      style={{
        borderLeft: depth > 0 ? "3px solid #e0e0e0" : "none",
        paddingLeft: depth > 0 ? 16 : 0,
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: depth === 0 ? "#0070f3" : "#28a745",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: "bold",
            flexShrink: 0,
          }}
        >
          {comment.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <span style={{ fontWeight: 500, fontSize: 14 }}>{comment.author}</span>
          {comment.date && (
            <span style={{ fontSize: 12, color: "#999", marginLeft: 8 }}>
              {new Date(comment.date).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <p style={{ margin: "0 0 8px 40px", fontSize: 14, color: "#333", lineHeight: 1.6 }}>
        {comment.text}
      </p>

      {/* BUG: replies are never rendered here — this block is missing */}
      {/* Missing: {comment.replies?.length > 0 && <CommentList comments={comment.replies} depth={depth + 1} />} */}
    </div>
  );
}

export default function CommentList({ comments = [], depth = 0 }) {
  if (!comments || comments.length === 0) {
    return (
      <p style={{ color: "#999", fontStyle: "italic", fontSize: 14 }}>
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div style={{ marginTop: depth === 0 ? 8 : 4 }}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} depth={depth} />
      ))}
    </div>
  );
}
