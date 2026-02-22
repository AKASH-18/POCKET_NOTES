import React, { useState } from "react";

// Popup component for creating a new group
const GroupPopup = ({ onClosePopup, onCreateGroup }) => {
  const [groupNameInput, setGroupNameInput] = useState(""); // Stores group name input
  const [chosenColor, setChosenColor] = useState("");       // Stores selected color

  // Predefined color options
  const colorPalette = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

  // Handle creating a new group
  const handleCreateGroup = () => {
    if (!groupNameInput.trim()) {
      alert("Please enter a group name");
      return;
    }
    if (!chosenColor) {
      alert("Please select a color");
      return;
    }

    onCreateGroup({ name: groupNameInput, color: chosenColor });
    // Reset input fields
    setGroupNameInput("");
    setChosenColor("");
    onClosePopup();
  };

  return (
    <div className="popup-overlay" onClick={onClosePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>Create New Group</h3>

        {/* Group name input */}
        <div className="input-row">
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupNameInput}
            onChange={(e) => setGroupNameInput(e.target.value)}
          />
        </div>

        {/* Color selection */}
        <div className="color-section">
          <label>Choose Color</label>
          <div className="color-options">
            {colorPalette.map((color, index) => (
              <div
                key={index}
                className={`color-circle ${chosenColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setChosenColor(color)}
              ></div>
            ))}
          </div>
        </div>

        {/* Create button */}
        <button onClick={handleCreateGroup}>Create</button>
      </div>
    </div>
  );
};

export default GroupPopup;
