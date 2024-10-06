import React from "react";
const AddButton = ({ onAddNote }) => {
  return (
    <button onClick={()=>onAddNote()} className="addbutton">
      <i className="bi bi-plus-lg"></i>
    </button>
  );
};

export default AddButton;
