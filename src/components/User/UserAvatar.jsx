// BUG: No onError handler — broken image shows native browser broken icon
// Should add: onError={(e) => { e.target.onerror = null; e.target.src = fallbackSrc; }}

const FALLBACK_AVATAR = "https://ui-avatars.com/api/?name=User&background=0070f3&color=fff";

export default function UserAvatar({ src, alt = "User Avatar", size = 40, name = "" }) {
  const initials = name
    ? name.split(" ").map((n) => n.charAt(0)).join("").toUpperCase().slice(0, 2)
    : "U";

  // If no src provided, render initials avatar
  if (!src) {
    return (
      <div
        title={alt}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "#0070f3",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.35,
          fontWeight: "bold",
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        {initials}
      </div>
    );
  }

  // BUG: Missing onError handler — if src URL is broken, shows broken image icon
  // Should be: onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_AVATAR; }}
  return (
    <img
      src={src}
      alt={alt}
      // BUG: onError handler missing here
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        border: "2px solid #eee",
      }}
    />
  );
}
