import React, { useState, useEffect, useRef } from "react";

function WebSocketDemo() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [ws, setWs] = useState(null);
  const ScrollBottom = useRef(null);
  useEffect(() => {
    if (ScrollBottom.current) {
      ScrollBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // <-- scrolls whenever messages change
  useEffect(() => {
    // Connect to WebSocket server
    const socket = new WebSocket("wss://ws.postman-echo.com/raw");
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
      setMessages((prev) => [...prev, `Server: ${event.data}`]);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on unmount
    return () => {
      socket?.close();
      setWs(null);
    };
  }, []);

  const sendMessage = () => {
    if (ws && inputMessage.trim() !== "") {
      ws.send(inputMessage);
      setMessages((prev) => [...prev, `You: ${inputMessage}`]);
      setInputMessage("");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "10px",
          overflowY: "auto",
          marginBottom: "10px",
          width: "50%",
          border: "1px solid gray",
          borderRadius: "8px",
          height: "500px",
          overflow: "auto",
        }}
      >
        {messages.map((msg, index) => {
          const isUser = msg.startsWith("You:");
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  maxWidth: "50%", // Limit bubble width
                  padding: "10px 14px",
                  borderRadius: "16px",
                  backgroundColor: isUser ? "#4caf50" : "#f1f0f0", // Green for user, light gray for server
                  color: isUser ? "white" : "black",
                  wordBreak: "break-word",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                  border: "1px solid gray",
                }}
              >
                {msg.replace(/^(You: |Server: )/, "")}
              </div>
            </div>
          );
        })}
        <div ref={ScrollBottom} />
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
          style={{
            border: "1px solid black",
            padding: 10,
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
            width: "80%",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            border: "1px solid black",
            padding: 10,
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            cursor: "pointer",
            width: "20%",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default WebSocketDemo;
