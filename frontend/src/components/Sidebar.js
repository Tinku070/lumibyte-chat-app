import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  async function loadSessions() {
    try {
      const res = await fetch("http://localhost:5000/api/sessions");
      const data = await res.json();
      if (data.ok) setSessions(data.sessions);
    } catch (err) {
      console.error(err);
    }
  }

  // Auto refresh whenever the route changes
  useEffect(() => {
    loadSessions();
  }, [location.pathname]);

  // Create new chat + refresh list
  async function newChat() {
    const res = await fetch("http://localhost:5000/api/new-chat");
    const data = await res.json();
    if (data.ok) {
      navigate(`/chat/${data.sessionId}`);
      loadSessions();
    }
  }

  return (
    <div className="w-72 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-3">
      <button
        onClick={newChat}
        className="px-3 py-2 bg-indigo-600 text-white w-full rounded mb-3"
      >
        New Chat
      </button>

      <h2 className="font-semibold mb-2">Sessions</h2>

      <div className="space-y-2">
        {sessions.map((s) => (
          <Link
            key={s.id}
            to={`/chat/${s.id}`}
            className={`block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              location.pathname === `/chat/${s.id}`
                ? "bg-indigo-100 dark:bg-indigo-900"
                : ""
            }`}
          >
            <div>{s.title}</div>
            <div className="text-xs text-gray-500">
              {new Date(s.createdAt).toLocaleString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
