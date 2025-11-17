import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import TableResponse from "./TableResponse";
import AnswerFeedback from "./AnswerFeedback";

export default function ChatWindow() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [input, setInput] = useState("");
  const bottom = useRef();

  useEffect(() => {
    loadSession();
    // eslint-disable-next-line
  }, [sessionId]);

  async function loadSession() {
    const res = await fetch(`http://localhost:5000/api/session/${sessionId}`);
    const data = await res.json();
    if (data.ok) {
      setSession(data.session);
      scrollBottom();
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    await fetch(`http://localhost:5000/api/chat/${sessionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });

    setInput("");
    loadSession();
  }

  function scrollBottom() {
    setTimeout(() => {
      bottom.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  async function giveFeedback(index, type) {
    await fetch(`http://localhost:5000/api/feedback/${sessionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageIndex: index, type }),
    });
    loadSession();
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-6 overflow-auto space-y-6">

        {session?.messages.map((m, idx) => (
          <div key={idx} className={`${m.role === "user" ? "text-right" : ""}`}>
            <div
              className={`inline-block max-w-3xl p-4 rounded-lg ${
                m.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>

              {m.table && (
                <div className="mt-3">
                  <TableResponse table={m.table} />
                </div>
              )}

              {m.role === "assistant" && (
                <AnswerFeedback
                  likes={m.likes}
                  dislikes={m.dislikes}
                  onLike={() => giveFeedback(idx, "like")}
                  onDislike={() => giveFeedback(idx, "dislike")}
                />
              )}
            </div>
          </div>
        ))}

        <div ref={bottom}></div>
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-3">
          <input
            className="flex-1 px-3 py-2 border rounded dark:border-gray-600 dark:bg-gray-700"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
