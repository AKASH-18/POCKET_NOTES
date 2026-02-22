import React, { useState, useEffect } from "react";
import GroupList from "./Components/GroupList.jsx";
import NotesSection from "./Components/NoteSection.jsx";
import GroupPopup from "./Components/Popup.jsx";
import "./index.css";
import emptyImg from "./assets/pocket_notes.png";

// Main App component for Pocket Notes
const PocketNotesApp = () => {
  // All groups stored in localStorage
  const [groupsData, setGroupsData] = useState(() => {
    return JSON.parse(localStorage.getItem("groups")) || [];
  });

  // Currently selected group
  const [activeGroup, setActiveGroup] = useState(null);

  // Popup visibility state
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Sync groups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groupsData));
  }, [groupsData]);

  // Add a new group
  const handleCreateGroup = ({ name, color }) => {
    if (name.length < 2) {
      return alert("Group name must be at least 2 letters");
    }
    if (groupsData.some((g) => g.name.toLowerCase() === name.toLowerCase())) {
      return alert("Duplicate group names not allowed");
    }

    const newGroup = { id: Date.now(), name, color, notes: [] };
    setGroupsData([...groupsData, newGroup]);
  };

  // Add a new note to a group
  const handleAddNote = (groupId, noteText) => {
    const now = new Date();
    const updatedGroups = groupsData.map((group) => {
      if (group.id === groupId) {
        const newNote = {
          id: Date.now(),
          text: noteText,
          date: now.toLocaleDateString(),
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        return { ...group, notes: [...group.notes, newNote] };
      }
      return group;
    });
    setGroupsData(updatedGroups);
  };

  return (
    <div className={`app-container ${activeGroup ? "group-selected" : ""}`}>
      {/* Left Panel: Group List */}
      <div className="left-panel">
        <div className="header">
          <h2>Pocket Notes</h2>
        </div>
        <div className="group-list">
          <GroupList
            groupData={groupsData}
            handleGroupSelect={setActiveGroup}
            activeGroup={activeGroup}
          />
        </div>
        <button className="add-btn" onClick={() => setIsPopupVisible(true)}>
          +
        </button>
      </div>

      {/* Right Panel: Notes or Empty State */}
      <div className="right-panel">
        {activeGroup ? (
          <NotesSection
            selectedGroup={activeGroup}
            handleAddNote={handleAddNote}
            allGroups={groupsData}
            onBackClick={() => setActiveGroup(null)}
          />
        ) : (
          <div className="empty-state">
            <div className="empty-notes">
              <img src={emptyImg} alt="No notes yet" />
              <h1>Pocket Notes</h1>
              <p>Send and receive messages without keeping your phone online.</p>
              <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
              <span className="lock">🔒end-to-end encrypted</span>
            </div>
          </div>
        )}
      </div>

      {/* Popup for creating new group */}
      {isPopupVisible && (
        <GroupPopup
          onClosePopup={() => setIsPopupVisible(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}
    </div>
  );
};

export default PocketNotesApp;
