import React from "react";

const ListItem = ({ note, index, onSelectNote }) => {
  const handleNoteTitle = () => {
    let noteTitle = note.body.split("\n")[0];
    return noteTitle.length > 40
      ? noteTitle.slice(0, 40).trim() + "..."
      : noteTitle;
  };

  const handleNoteUpdatedDate = () => {
    return note.updated.split("T")[0];
  };

  const handleNoteBody = () => {
    return note.body.length > 30
      ? note.body.slice(0, 30).trim() + "..."
      : note.body;
  };

  return (
    <div className="list-item" onClick={() => onSelectNote(note.id)}>
      <div className="text-container">
        <h2>
          {index + 1}.{handleNoteTitle()}
        </h2>
        <p>{handleNoteBody()}</p>
      </div>
      <div className="date-container">
        <span>{handleNoteUpdatedDate()}</span>
      </div>
    </div>
  );
};

export default ListItem;
