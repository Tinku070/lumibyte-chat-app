// mockData.js
// Simple in-memory mock storage for sessions & conversations.

const sessions = {}; // { sessionId: { id, title, messages: [{...}], createdAt } }

function generateSampleTable(question) {
  return {
    columns: ["Name", "Count", "Value"],
    rows: [
      ["Alpha", Math.floor(Math.random() * 100), (Math.random() * 1000).toFixed(2)],
      ["Beta", Math.floor(Math.random() * 100), (Math.random() * 1000).toFixed(2)],
      ["Gamma", Math.floor(Math.random() * 100), (Math.random() * 1000).toFixed(2)],
    ],
  };
}

function createSession(title) {
  const id = `s_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const session = {
    id,
    title: title || `New Chat - ${new Date().toLocaleString()}`,
    messages: [
      {
        role: "assistant",
        text: "Hello! This is a mock assistant. Ask me anything — I'll return structured (tabular) data as a sample.",
        table: null,
        likes: 0,
        dislikes: 0
      },
    ],
    createdAt: new Date().toISOString(),
  };

  sessions[id] = session;
  return session;
}

function getSessionsList() {
  return Object.values(sessions).map((s) => ({
    id: s.id,
    title: s.title,
    createdAt: s.createdAt,
  }));
}

function addUserMessageToSession(sessionId, question) {
  const session = sessions[sessionId];
  if (!session) return null;

  session.messages.push({
    role: "user",
    text: question,
    table: null,
  });

  const table = generateSampleTable(question);
  const assistantReply = {
    role: "assistant",
    text: `Mock answer to "${question}". Below is a sample structured table.`,
    table,
    likes: 0,
    dislikes: 0,
  };

  session.messages.push(assistantReply);
  return assistantReply;
}

function updateFeedback(sessionId, messageIndex, type) {
  const session = sessions[sessionId];
  if (!session) return null;

  const msg = session.messages[messageIndex];
  if (!msg || msg.role !== "assistant") return null;

  if (type === "like") msg.likes += 1;
  else if (type === "dislike") msg.dislikes += 1;

  return msg;
}

module.exports = {
  createSession,
  getSessionsList,
  addUserMessageToSession,
  updateFeedback,
  sessions,
};
