import { useState } from "react";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import PostList from "./components/Posts/PostList";
import PostDetail from "./components/Posts/PostDetail";
import CreatePost from "./components/Posts/CreatePost";
import SearchBar from "./components/Search/SearchBar";
import SearchResults from "./components/Search/SearchResults";
import UserProfile from "./components/User/UserProfile";
import CommentForm from "./components/Comments/CommentForm";

const NAV_ITEMS = ["Posts", "Search", "Create Post", "Login", "Register", "Profile"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Posts");
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchResults = (results, query) => {
    setSearchResults(results);
    setSearchQuery(query);
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>
            📝 BlogPlatform
          </h1>
          <nav style={{ display: "flex", gap: 4 }}>
            {NAV_ITEMS.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSelectedPost(null); }}
                style={{
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: activeTab === tab ? 600 : 400,
                  background: activeTab === tab ? "#0070f3" : "transparent",
                  color: activeTab === tab ? "#fff" : "#555",
                  transition: "all 0.15s",
                }}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {activeTab === "Posts" && !selectedPost && (
          <PostList onSelectPost={setSelectedPost} />
        )}

        {activeTab === "Posts" && selectedPost && (
          <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        )}

        {activeTab === "Search" && (
          <div>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Search Posts</h2>
            <SearchBar onResults={handleSearchResults} />
            <SearchResults results={searchResults} query={searchQuery} />
          </div>
        )}

        {activeTab === "Create Post" && (
          <CreatePost onSubmit={(post) => { console.log("New post:", post); }} />
        )}

        {activeTab === "Login" && (
          <LoginForm onLogin={(user) => console.log("Logged in:", user)} />
        )}

        {activeTab === "Register" && (
          <RegisterForm onRegister={(user) => console.log("Registered:", user)} />
        )}

        {activeTab === "Profile" && (
          <div>
            <UserProfile />
            <div style={{ maxWidth: 500, margin: "24px auto 0" }}>
              <h3 style={{ marginBottom: 12 }}>Try Adding a Comment</h3>
              <CommentForm onSubmit={(c) => console.log("Comment:", c)} postId={1} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #eee", padding: 24, textAlign: "center", color: "#aaa", fontSize: 13, marginTop: 48 }}>
        BlogPlatform — Buggy Demo for AI Agent Practice
      </footer>
    </div>
  );
}
