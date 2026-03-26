// BUG: No "no results found" message shown when search returns empty array
// Should render: if (results.length === 0 && query) return <p>No results found for "{query}"</p>

function highlightMatch(text, query) {
  if (!query) return text;
  const index = text.indexOf(query);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark style={{ background: "#fff176", padding: 0 }}>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function SearchResults({ results = [], query = "" }) {
  // BUG: Missing empty state — when results is empty and query is set, nothing is shown
  // Should be:
  // if (results.length === 0 && query.trim()) {
  //   return <p style={{ textAlign: "center", color: "#999" }}>No results found for "{query}"</p>;
  // }

  if (!query.trim()) {
    return (
      <div style={{ textAlign: "center", color: "#aaa", padding: 32, fontSize: 15 }}>
        Start typing to search posts...
      </div>
    );
  }

  // BUG: Falls through to empty render when results is [] and query is set
  return (
    <div style={{ maxWidth: 600, margin: "16px auto", padding: "0 16px" }}>
      {results.length > 0 && (
        <p style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>
          {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
        </p>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {results.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              padding: 16,
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <h4 style={{ margin: "0 0 6px", fontSize: 16, color: "#1a1a1a" }}>
              {highlightMatch(post.title, query)}
            </h4>
            <p style={{ margin: "0 0 8px", fontSize: 13, color: "#666", lineHeight: 1.5 }}>
              {post.content.slice(0, 120)}...
            </p>
            <div style={{ display: "flex", gap: 4 }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{ background: "#f0f7ff", color: "#0070f3", padding: "2px 8px", borderRadius: 10, fontSize: 11 }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
