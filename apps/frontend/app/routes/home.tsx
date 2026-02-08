import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data: any) => setMessage(data.message))
      .catch((err) => setMessage("Error connecting to API"));
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>React Router v7 + Cloudflare</h1>
      <p>This is the frontend application.</p>
      <p>Backend says: <strong>{message}</strong></p>
    </div>
  );
}
