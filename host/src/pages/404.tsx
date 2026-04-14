import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1 style={{ fontSize: "6rem", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
        Page not found
      </p>
      <button onClick={() => navigate("/")}>Go home</button>
    </div>
  );
}
