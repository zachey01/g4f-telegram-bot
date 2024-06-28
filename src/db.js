import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./dialogues.db");

db.run(`
  CREATE TABLE IF NOT EXISTS dialogues (
    user_id TEXT,
    messages TEXT,
    language TEXT DEFAULT 'en',
    model TEXT DEFAULT 'gpt-4'
  )
`);

export const getDialogueHistory = (userId) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT messages, language, model FROM dialogues WHERE user_id = ?",
      [userId],
      (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve({
          messages: row ? JSON.parse(row.messages) : [],
          language: row ? row.language : "en",
          model: row ? row.model : "gpt-4",
        });
      }
    );
  });
};

export const updateDialogueHistory = (userId, messages, language, model) => {
  return new Promise((resolve, reject) => {
    db.run(
      "REPLACE INTO dialogues (user_id, messages, language, model) VALUES (?, ?, ?, ?)",
      [userId, JSON.stringify(messages), language, model],
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
};

export const clearDialogueHistory = (userId) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM dialogues WHERE user_id = ?", [userId], (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
