import { useState } from "react";

// Mock login handler — simulates auth
function mockLogin(email, password) {
  return email === "admin@blog.com" && password === "password123";
}

// FIXED: Password minimum length check is now correct — requires at least 8 chars
function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return null;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? null : "Invalid email address";
}

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    setErrors({});
    const success = mockLogin(email, password);
    if (success) {
      setMessage("Login successful! Welcome back.");
      if (onLogin) onLogin({ email });
    } else {
      setMessage("Invalid credentials. Try admin@blog.com / password123");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
            placeholder="you@example.com"
          />
          {errors.email && <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
            placeholder="Enter password"
          />
          {errors.password && <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>{errors.password}</p>}
        </div>

        <button
          type="submit"
          style={{ width: "100%", padding: 10, background: "#0070f3", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
        >
          Login
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 12, color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
