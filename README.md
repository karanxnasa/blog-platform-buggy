# Blog Platform — Buggy Demo

> A React + Vite project **intentionally created with bugs** for AI-powered bug-fixing agent practice.

An AI agent will:
1. Read GitHub Issues from this repo
2. Find the buggy files locally
3. Fix the bugs automatically
4. Resolve the GitHub Issues

---

## Setup

```bash
npm install
npm run dev
```

---

## Bug Inventory

| File | Bug | Fix |
|---|---|---|
| `Auth/LoginForm.jsx` | Password min length is 3 instead of 8 | Change `< 3` to `< 8` in `validatePassword` |
| `Auth/RegisterForm.jsx` | `validateEmail` always returns `true` | Add real regex check |
| `Posts/PostList.jsx` | Posts not sorted by date | Add `.sort((a, b) => new Date(b.date) - new Date(a.date))` |
| `Posts/PostCard.jsx` | Content truncated at 20 chars instead of 100 | Change `slice(0, 20)` to `slice(0, 100)` |
| `Posts/PostDetail.jsx` | `post.comments.length` crashes when undefined | Use `post.comments?.length \|\| 0` |
| `Posts/CreatePost.jsx` | Empty title allowed on submit | Add `if (!title.trim())` guard |
| `Comments/CommentList.jsx` | Nested replies never rendered | Add recursive `<CommentList>` for `comment.replies` |
| `Comments/CommentForm.jsx` | Empty comment can be submitted | Add `if (!comment.trim())` guard |
| `Search/SearchBar.jsx` | Search is case-sensitive | Add `.toLowerCase()` on both sides |
| `Search/SearchResults.jsx` | No "no results" message shown | Add `if (results.length === 0)` empty state |
| `User/UserProfile.jsx` | Crashes when `user.name` is null | Use `user.name?.toUpperCase() \|\| 'Anonymous'` |
| `User/UserAvatar.jsx` | Broken image has no fallback | Add `onError` handler to `<img>` |

---

## Tech Stack

- React 18
- Vite 5
- No backend — all mock/hardcoded data
