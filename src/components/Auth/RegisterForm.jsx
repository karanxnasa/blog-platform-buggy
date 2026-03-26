import { useState } from "react";

// BUG: validateEmail always returns true — any string is accepted as a valid email
// Should perform a real regex check: return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
function validateEmail(email) {
  return true;
}

function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return null;
}

function validateUsername(username) {
  if (!username || username.trim().length < 3) {
    return "Username must be at least 3 characters";
  }
  return null;
}

const mockUsers = [
  { id: 1, email: "alice@blog.com", username: "alice" },
  { id: 2, email: "bob@blog.com", username: "bob" },
];

export default function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = {};
    const usernameErr = validateUsername(username);
    if (usernameErr) errs.username = usernameErr;

    // BUG: validateEmail always returns true, so this check never catches bad emails
    if (!validateEmail(email)) errs.email = "Invalid email address";

    const passErr = validatePassword(password);
    if (passErr) errs.password = passErr;

    if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";

    const alreadyExists = mockUsers.find((u) => u.email === email);
    if (alreadyExists) errs.email = "Email already registered";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setMessage(`Account created for ${username}! You can now login.`);
    if (onRegister) onRegister({ username, email });
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
            placeholder="yourname"
          />
          {errors.username && <p style={{ color: "red", fontSize: 12 }}>{errors.username}</p>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
            placeholder="you@example.com"
          />
          {errors.email && <p style={{ color: "red", fontSize: 12 }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
          />
          {errors.password && <p style={{ color: "red", fontSize: 12 }}>{errors.password}</p>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
          />
          {errors.confirmPassword && <p style={{ color: "red", fontSize: 12 }}>{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          style={{ width: "100%", padding: 10, background: "#28a745", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
        >
          Register
        </button>
      </form>

      {message && <p style={{ marginTop: 12, color: "green" }}>{message}</p>}
    </div>
  );
}
