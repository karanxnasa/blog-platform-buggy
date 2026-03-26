import PostCard from "./PostCard";

// Mock data — 6 blog posts with varying dates
const mockPosts = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    content:
      "React Hooks revolutionized the way we write functional components. useState and useEffect are the two most commonly used hooks that allow you to manage state and side effects without class components.",
    date: "2026-03-10",
    author: "Alice Johnson",
    comments: [{ id: 1, text: "Great post!", author: "Bob" }],
    tags: ["react", "hooks", "javascript"],
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures",
    content:
      "Closures are one of the most powerful and often misunderstood features of JavaScript. A closure is created when a function retains access to variables from its outer scope even after the outer function has returned.",
    date: "2026-03-01",
    author: "Bob Smith",
    comments: [],
    tags: ["javascript", "closures", "fundamentals"],
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox: When to Use Which",
    content:
      "CSS Grid and Flexbox are both powerful layout tools but serve different purposes. Flexbox is one-dimensional — great for rows or columns. Grid is two-dimensional — perfect for full page layouts.",
    date: "2026-03-15",
    author: "Carol White",
    comments: [
      { id: 1, text: "Very helpful comparison!", author: "Dave" },
      { id: 2, text: "Bookmarked this.", author: "Eve" },
    ],
    tags: ["css", "grid", "flexbox"],
  },
  {
    id: 4,
    title: "Node.js Best Practices in 2026",
    content:
      "Building production-ready Node.js applications requires understanding async patterns, proper error handling, security considerations, and performance optimization techniques that have evolved over the years.",
    date: "2026-02-20",
    author: "Dave Lee",
    comments: [],
    tags: ["nodejs", "backend", "javascript"],
  },
  {
    id: 5,
    title: "Building AI Agents with LangChain",
    content:
      "AI agents are autonomous systems that can reason, plan, and execute multi-step tasks. LangChain provides the tooling to build agents that can call APIs, read files, and chain multiple LLM calls together.",
    date: "2026-03-20",
    author: "Alice Johnson",
    comments: [{ id: 1, text: "This is the future!", author: "Carol" }],
    tags: ["ai", "langchain", "agents"],
  },
  {
    id: 6,
    title: "TypeScript Generics Deep Dive",
    content:
      "TypeScript generics allow you to write reusable, type-safe code. From simple generic functions to complex conditional types, mastering generics will make your TypeScript code significantly more robust.",
    date: "2026-03-05",
    author: "Eve Turner",
    comments: [],
    tags: ["typescript", "generics", "types"],
  },
];

// BUG: Posts are not sorted by date — newest should appear first
// Should be: [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
function getSortedPosts(posts) {
  return posts; // Missing sort — returns in insertion order
}

export default function PostList({ onSelectPost }) {
  const posts = getSortedPosts(mockPosts);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 20, fontSize: 24, borderBottom: "2px solid #eee", paddingBottom: 8 }}>
        Latest Posts
      </h2>
      <div style={{ display: "grid", gap: 16 }}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onClick={onSelectPost} />
        ))}
      </div>
    </div>
  );
}
