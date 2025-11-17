const express = require("express");
const cors = require("cors");
const {
  createSession,
  getSessionsList,
  addUserMessageToSession,
  updateFeedback,
  sessions,
} = require("./mockData");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/api/sessions", (req, res) => {
  const list = getSessionsList();
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ ok: true, sessions: list });
});

app.get("/api/new-chat", (req, res) => {
  const session = createSession();
  res.json({ ok: true, sessionId: session.id, title: session.title });
});

app.get("/api/session/:id", (req, res) => {
  const id = req.params.id;
  const session = sessions[id];
  if (!session) return res.status(404).json({ ok: false, message: "Session not found" });
  res.json({ ok: true, session });
});

app.post("/api/chat/:id", (req, res) => {
  const id = req.params.id;
  const { question } = req.body;

  if (!question || !question.trim())
    return res.status(400).json({ ok: false, message: "Question required" });

  const msg = addUserMessageToSession(id, question);

  if (!msg) return res.status(404).json({ ok: false, message: "Session not found" });

  res.json({ ok: true, answer: msg });
});

app.post("/api/feedback/:id", (req, res) => {
  const id = req.params.id;
  const { messageIndex, type } = req.body;

  const updated = updateFeedback(id, messageIndex, type);
  if (!updated) return res.status(400).json({ ok: false, message: "Invalid request" });

  res.json({ ok: true, updated });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
