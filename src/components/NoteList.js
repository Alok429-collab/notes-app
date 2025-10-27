import React from "react";
import Note from "./Note";
import AddNote from "./AddNote";

function NoteList({ notes, handleAddNote, handleDeleteNote, handleUpdateNote }) {
  return (
    <div className="notes-section">
      <AddNote handleAddNote={handleAddNote} />
      <div className="notes-list">
        {notes.length === 0 && <p className="no-notes">No notes yet — add one!</p>}
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleDeleteNote={handleDeleteNote}
            handleUpdateNote={handleUpdateNote}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;
