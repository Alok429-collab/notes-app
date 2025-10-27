import React, { useState, useEffect, useRef } from "react";

const COLOR_OPTIONS = ["", "#FFEE93", "#FFC09F", "#ADF7B6", "#A0CED9", "#CFBFF7"];
const MOODS = ["", "🙂", "😌", "🤩", "😔"];

function AddNote({ handleAddNote }) {
  const [noteText, setNoteText] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState("");
  const [mood, setMood] = useState("");
  const characterLimit = 500;
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    // Initialize speech recognition if available
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (SpeechRecognition) {
      const r = new SpeechRecognition();
      r.continuous = false;
      r.interimResults = false;
      r.lang = "en-US";
      r.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setNoteText((prev) => (prev ? prev + " " + text : text));
      };
      r.onend = () => setListening(false);
      recognitionRef.current = r;
    }
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return alert("Speech recognition not supported in this browser.");
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch (e) {
      console.warn(e);
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setListening(false);
  };

  const handleSaveClick = () => {
    if (noteText.trim().length === 0) return;
    handleAddNote({
      text: noteText.trim(),
      color,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      mood,
    });
    setNoteText("");
    setTags("");
    setColor("");
    setMood("");
  };

  return (
    <div className="add-note-card">
      <textarea
        rows="4"
        placeholder="Write a note... (you can use voice)"
        value={noteText}
        onChange={(e) => {
          if (e.target.value.length <= characterLimit) setNoteText(e.target.value);
        }}
      />

      <div className="row small">
        <input
          placeholder="tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="tags-input"
        />

        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          {MOODS.map((m, idx) => (
            <option key={idx} value={m}>
              {m ? `${m} mood` : "No mood"}
            </option>
          ))}
        </select>

        <div className="color-palette">
          {COLOR_OPTIONS.map((c, i) => (
            <button
              key={i}
              className={`color-swatch ${color === c ? "selected" : ""}`}
              style={{ backgroundColor: c || "#fff", border: c ? "none" : "1px solid #ccc" }}
              onClick={() => setColor(c)}
              title={c || "default"}
            />
          ))}
        </div>
      </div>

      <div className="row small">
        <div>
          {recognitionRef.current ? (
            listening ? (
              <button className="stop-btn" onClick={stopListening}>Stop 🎤</button>
            ) : (
              <button className="voice-btn" onClick={startListening}>Voice 🎤</button>
            )
          ) : (
            <button className="voice-btn disabled" onClick={() => alert("Speech not supported")}>
              Voice not supported
            </button>
          )}
        </div>

        <div className="right">
          <small>{characterLimit - noteText.length} remaining</small>
          <button onClick={handleSaveClick} className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
