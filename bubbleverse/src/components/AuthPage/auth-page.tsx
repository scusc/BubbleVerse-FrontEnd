import React, { useState } from "react";
import SignInService from "../../services/sign-in.service";
import SignUpService from "../../services/sign-up.service";

const AuthPage: React.FC = () => {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (tab === "signin") {
        await SignInService.signIn(email, password);
        alert("Signed in!");
      } else {
        await SignUpService.signUp(email, password);
        alert("Signed up!");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.tabs}>
          <button
            style={tab === "signin" ? styles.activeTab : styles.tab}
            onClick={() => setTab("signin")}
          >
            Sign In
          </button>
          <button
            style={tab === "signup" ? styles.activeTab : styles.tab}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
        </div>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete={tab === "signin" ? "current-password" : "new-password"}
          />
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Loading..." : tab === "signin" ? "Sign In" : "Sign Up"}
          </button>
          {error && <div style={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    padding: 32,
    minWidth: 320,
    maxWidth: 360,
    width: "100%",
  },
  tabs: {
    display: "flex",
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    padding: "12px 0",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    fontWeight: 500,
    fontSize: 18,
    cursor: "pointer",
    color: "#888",
    transition: "color 0.2s",
  },
  activeTab: {
    flex: 1,
    padding: "12px 0",
    background: "none",
    border: "none",
    borderBottom: "2px solid #6a82fb",
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    color: "#6a82fb",
    transition: "color 0.2s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  input: {
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid #e0e0e0",
    fontSize: 16,
    outline: "none",
    transition: "border 0.2s",
  },
  button: {
    padding: "12px 0",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 8,
    transition: "background 0.2s",
  },
  error: {
    color: "#fc5c7d",
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
  },
};

export default AuthPage;