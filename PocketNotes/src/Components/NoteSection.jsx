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

  // Format date safely
  const formatNoteDate = (note) => {
    // First try to use the full date if available
    if (note.fullDate) {
      try {
        const date = new Date(note.fullDate);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        }
      } catch (error) {
        // Fall through to next option
      }
    }

    // If we have separate date and time fields
    if (note.date && note.time) {
      try {
        // Try to parse the date part
        const dateParts = note.date.split('/');
        if (dateParts.length === 3) {
          // Assuming format DD/MM/YYYY
          const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
          if (!isNaN(date.getTime())) {
            return date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
          }
        }
      } catch (error) {
        // Fall through to next option
      }
    }

    // If we have just a date string
    if (note.date) {
      try {
        const date = new Date(note.date);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        }
      } catch (error) {
        // Return the original date string if all parsing fails
        return note.date || "Invalid date";
      }
    }

    return "Invalid date";
  };

  // Generate initials and avatar color for the group
  const groupInitials = selectedGroup.name.slice(0, 2).toUpperCase();
  const avatarColor = selectedGroup.color || "#ccc";

  // Debug: Log the first note to see its structure
  useEffect(() => {
    if (groupNotes.length > 0) {
      console.log("First note structure:", groupNotes[0]);
    }
  }, [groupNotes]);

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
                  {formatNoteDate(note)}
                </span>
                <span className="note-dot">•</span>
                <span className="note-time">{note.time || ""}</span>
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