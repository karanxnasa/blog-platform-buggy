// BUG: Crashes when user.name is null — .toUpperCase() called on null
// Should be: user.name?.toUpperCase() || 'Anonymous'

const mockUser = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@blog.com",
  bio: "Full-stack developer passionate about React and Node.js. Writing about web development since 2020.",
  avatar: null,
  joinDate: "2024-01-15",
  postsCount: 12,
  followersCount: 248,
  followingCount: 91,
};

// Set name to null to trigger the bug in demo
// const mockUser = { ...mockUser, name: null }; // Uncomment to reproduce bug

function formatJoinDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

export default function UserProfile({ user = mockUser }) {
  // BUG: Will crash with TypeError if user.name is null
  const displayName = user.name.toUpperCase(); // BUG: should be user.name?.toUpperCase() || 'Anonymous'

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 24, border: "1px solid #eee", borderRadius: 12, background: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#0070f3",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: "bold",
            flexShrink: 0,
          }}
        >
          {user.name ? user.name.charAt(0) : "?"}
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 22 }}>{displayName}</h2>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>{user.email}</p>
          <p style={{ margin: "2px 0 0", color: "#999", fontSize: 12 }}>
            Member since {formatJoinDate(user.joinDate)}
          </p>
        </div>
      </div>

      <p style={{ color: "#444", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{user.bio}</p>

      <div style={{ display: "flex", justifyContent: "space-around", padding: "16px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee", marginBottom: 20 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: "bold", color: "#1a1a1a" }}>{user.postsCount}</div>
          <div style={{ fontSize: 12, color: "#999" }}>Posts</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: "bold", color: "#1a1a1a" }}>{user.followersCount}</div>
          <div style={{ fontSize: 12, color: "#999" }}>Followers</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: "bold", color: "#1a1a1a" }}>{user.followingCount}</div>
          <div style={{ fontSize: 12, color: "#999" }}>Following</div>
        </div>
      </div>

      <button
        style={{ width: "100%", padding: 10, background: "#0070f3", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14 }}
      >
        Follow
      </button>
    </div>
  );
}
