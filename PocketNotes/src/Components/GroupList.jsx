// Renders the list of note groups
const GroupList = ({ groupData, handleGroupSelect, activeGroup }) => {
    return (
      <ul className="group-list-items">
        {groupData.map((item) => {
          // Create initials from first two characters of group name
          const groupInitials = item.name.slice(0, 2).toUpperCase();
  
          return (
            <li
              key={item.id}
              // Trigger group selection on click
              onClick={() => handleGroupSelect(item)}
              // Highlight currently selected group
              className={activeGroup?.id === item.id ? "selected" : ""}
            >
              {/* Group avatar with dynamic background color */}
              <div
                className="avatar"
                style={{ backgroundColor: item.color }}
              >
                {groupInitials}
              </div>
  
              {/* Group name */}
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  
  export default GroupList;
  