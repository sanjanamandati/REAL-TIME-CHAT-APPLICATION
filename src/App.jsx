/// FULL SCREEN MODERN CHAT UI (Better colors, spacing, responsive)
// React Vite WebSocket Chat Frontend

import { useState, useEffect, useRef } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const ws = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => ws.current.close();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "" || username.trim() === "") return;

    const msg = {
      user: username,
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    ws.current.send(JSON.stringify(msg));
    setInput("");
  };

  return (
    <div style={styles.app}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>💬 Chat App</h2>
        <input
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.nameInput}
        />
      </div>

      <div style={styles.chatSection}>
        <div style={styles.header}>Real-Time Messaging</div>

        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageRow,
                justifyContent:
                  msg.user === username ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.messageBubble,
                  backgroundColor:
                    msg.user === username ? "#2563eb" : "#e5e7eb",
                  color: msg.user === username ? "white" : "black",
                }}
              >
                <div style={styles.msgUser}>{msg.user}</div>
                <div>{msg.text}</div>
                <div style={styles.time}>{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div style={styles.inputArea}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={styles.messageInput}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} style={styles.sendBtn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= FULL SCREEN PROFESSIONAL STYLES =================
const styles = {
  app: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "Segoe UI, sans-serif",
  },

  sidebar: {
    width: "25%",
    background: "linear-gradient(180deg, #1e3a8a, #2563eb)",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  logo: {
    margin: 0,
  },

  nameInput: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },

  chatSection: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    background: "#f1f5f9",
  },

  header: {
    padding: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
    background: "white",
  },

  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  messageRow: {
    display: "flex",
  },

  messageBubble: {
    maxWidth: "60%",
    padding: "10px 14px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },

  msgUser: {
    fontWeight: "bold",
    fontSize: "12px",
    marginBottom: "4px",
  },

  time: {
    fontSize: "10px",
    marginTop: "4px",
    textAlign: "right",
    opacity: 0.7,
  },

  inputArea: {
    display: "flex",
    padding: "10px",
    background: "white",
    borderTop: "1px solid #ddd",
  },

  messageInput: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },

  sendBtn: {
    padding: "12px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

// Backend server code remains same




