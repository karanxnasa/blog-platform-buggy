import { useState } from "react";

// Mock posts database for search
const allPosts = [
  { id: 1, title: "Getting Started with React Hooks", content: "React Hooks revolutionized the way we write functional components. useState and useEffect are the most commonly used.", tags: ["react", "hooks"] },
  { id: 2, title: "Understanding JavaScript Closures", content: "Closures are one of the most powerful features of JavaScript. They allow functions to retain access to outer scope variables.", tags: ["javascript", "closures"] },
  { id: 3, title: "CSS Grid vs Flexbox: When to Use Which", content: "CSS Grid and Flexbox are both layout tools but serve different purposes. Flexbox is one-dimensional, Grid is two-dimensional.", tags: ["css", "grid", "flexbox"] },
  { id: 4, title: "Node.js Best Practices in 2026", content: "Building production-ready Node.js applications requires async patterns, error handling, and security considerations.", tags: ["nodejs", "backend"] },
  { id: 5, title: "Building AI Agents with LangChain", content: "AI agents are autonomous systems that can reason and execute multi-step tasks using LangChain tools.", tags: ["ai", "langchain"] },
  { id: 6, title: "TypeScript Generics Deep Dive", content: "TypeScript generics allow you to write reusable type-safe code with conditional types and mapped types.", tags: ["typescript", "generics"] },
];

// BUG: Search is case-sensitive — "React" and "react" give different results
// Fix: add .toLowerCase() to both searchTerm and the fields being compared
function searchPosts(query) {
  if (!query.trim()) return [];
  return allPosts.filter((post) => {
    // BUG: No .toLowerCase() — case-sensitive comparison
    return (
      post.title.includes(query) ||        // BUG: should be post.title.toLowerCase().includes(query.toLowerCase())
      post.content.includes(query) ||      // BUG: same issue
      post.tags.some((tag) => tag.includes(query)) // BUG: same issue
    );
  });
}

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    const results = searchPosts(value);
    if (onResults) onResults(results, value);
  };

  const handleClear = () => {
    setQuery("");
    if (onResults) onResults([], "");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px" }}>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#999",
            fontSize: 16,
          }}
        >
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search posts... (try 'React' vs 'react')"
          style={{
            width: "100%",
            padding: "10px 40px 10px 36px",
            border: "1px solid #ddd",
            borderRadius: 24,
            fontSize: 15,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        {query && (
          <button
            onClick={handleClear}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#999",
              fontSize: 14,
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
