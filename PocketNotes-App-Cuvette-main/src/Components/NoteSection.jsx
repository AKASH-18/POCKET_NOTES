import { useState, useEffect } from "react";

// Component to display notes for a selected group
const NotesSection = ({ selectedGroup, handleAddNote, allGroups, onBackClick }) => {
  const [currentNote, setCurrentNote] = useState(""); // Current note input
  const [groupNotes, setGroupNotes] = useState([]);   // Notes for the selected group

  // Update notes when selectedGroup or allGroups changes
  useEffect(() => {
    const matchedGroup = allGroups.find((g) => g.id === selectedGroup.id);
    setGroupNotes(matchedGroup ? matchedGroup.notes : []);
  }, [selectedGroup, allGroups]);

  // Add note and reset input
  const addNewNote = () => {
    if (currentNote.trim() === "") return;
    handleAddNote(selectedGroup.id, currentNote);
    setCurrentNote("");
  };

  // Handle Enter key for adding note
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addNewNote();
    }
  };

  // Generate initials and avatar color for the group
  const groupInitials = selectedGroup.name.slice(0, 2).toUpperCase();
  const avatarColor = selectedGroup.color || "#ccc";

  return (
    <div className="notes-section">
      {/* Header with back button and group info */}
      <div className="notes-header">
        <button className="back-btn" onClick={onBackClick}>
          ←
        </button>
        <div className="avatar" style={{ backgroundColor: avatarColor }}>
          {groupInitials}
        </div>
        <h2>{selectedGroup.name}</h2>
      </div>

      {/* Notes list */}
      <div className="notes-list">
        {groupNotes.length === 0 ? (
          <div className="notes-list-empty">
            <p>Your Notes are Empty.</p>
          </div>
        ) : (
          groupNotes.map((note) => (
            <div key={note.id} className="note-item">
              <p>{note.text}</p>
              <span>
                <span className="note-date">
                  {new Date(note.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="note-dot">•</span>
                <span className="note-time">{note.time}</span>
              </span>
            </div>
          ))
        )}
      </div>

      {/* Input area for new note */}
      <div className="note-input">
        <textarea
          placeholder="Enter your text here..."
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addNewNote}
          disabled={!currentNote.trim()}
          className={currentNote.trim() ? "active" : ""}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default NotesSection;
