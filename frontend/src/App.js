import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ThemeToggle from "./components/ThemeToggle";

function AppShell() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700">
            <h1 className="text-lg font-semibold">Lumibyte — Simplified Chat</h1>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/chat/:sessionId" element={<ChatWindow />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function Landing() {
  const navigate = useNavigate();
  async function startNew() {
    const res = await fetch("http://localhost:5000/api/new-chat");
    const data = await res.json();
    if (data.ok) navigate(`/chat/${data.sessionId}`);
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Start a New Chat</h2>
      <button onClick={startNew} className="px-4 py-2 bg-indigo-600 text-white rounded">New Chat</button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
