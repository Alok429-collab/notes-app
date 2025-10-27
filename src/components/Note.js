import React, { useState } from "react";

function Note({ note, handleDeleteNote, handleUpdateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);
  const [editTags, setEditTags] = useState((note.tags || []).join(", "));
  const [editMood, setEditMood] = useState(note.mood || "");
  const [editColor, setEditColor] = useState(note.color || "");

  const saveEdit = () => {
    handleUpdateNote(note.id, {
      text: editText,
      tags: editTags.split(",").map((t) => t.trim()).filter(Boolean),
      mood: editMood,
      color: editColor,
    });
    setIsEditing(false);
  };

  return (
    <div
      className="note"
      style={{ backgroundColor: editColor || note.color || "" }}
    >
      {isEditing ? (
        <>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows="4"
          />
          <input
            className="tags-input"
            placeholder="tags comma separated"
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
          />
          <div className="edit-row">
            <select value={editMood} onChange={(e) => setEditMood(e.target.value)}>
              <option value="">No mood</option>
              <option value="🙂">🙂 Happy</option>
              <option value="😌">😌 Calm</option>
              <option value="🤩">🤩 Excited</option>
              <option value="😔">😔 Sad</option>
            </select>

            <div className="color-palette small">
              {["", "#FFEE93", "#FFC09F", "#ADF7B6", "#A0CED9", "#CFBFF7"].map(
                (c, i) => (
                  <button
                    key={i}
                    className={`color-swatch ${editColor === c ? "selected" : ""}`}
                    style={{ backgroundColor: c || "#fff", border: c ? "none":"1px solid #ccc" }}
                    onClick={() => setEditColor(c)}
                    title={c || "default"}
                  />
                )
              )}
            </div>
          </div>

          <div className="note-footer">
            <small>{note.date}</small>
            <div className="note-actions">
              <button className="save-btn" onClick={saveEdit}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="note-top">
            <div className="note-text">{note.text}</div>
          </div>

          <div className="meta-row">
            <div className="mood">{note.mood}</div>
            <div className="tags">
              {(note.tags || []).map((t, idx) => (
                <span key={idx} className="tag">#{t}</span>
              ))}
            </div>
          </div>

          <div className="note-footer">
            <small>{note.date}</small>
            <div className="note-actions">
              <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
