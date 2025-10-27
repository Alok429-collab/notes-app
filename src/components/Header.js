import React from "react";

function Header({ handleSearchNote, handleToggleDarkMode }) {
  return (
    <div className="header">
      <h1>🗒️ Smart Notes</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search notes..."
          onChange={(e) => handleSearchNote(e.target.value)}
        />
        <button
          onClick={() =>
            handleToggleDarkMode((prevDarkMode) => !prevDarkMode)
          }
          className="dark-btn"
        >
          Toggle Dark
        </button>
      </div>
    </div>
  );
}

export default Header;
