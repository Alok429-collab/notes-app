import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addNote = (note) => {
    // note: { text, color, tags, mood }
    const date = new Date();
    const newNote = {
      id: Date.now(),
      text: note.text,
      color: note.color || "",
      tags: note.tags || [],
      mood: note.mood || "",
      date: date.toLocaleString(),
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const updateNote = (id, updatedFields) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, ...updatedFields } : n))
    );
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <div className="container">
        <Header
          handleSearchNote={setSearchText}
          handleToggleDarkMode={setDarkMode}
        />

        <NoteList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText.toLowerCase())
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleUpdateNote={updateNote}
        />
      </div>
    </div>
  );
}

export default App;
