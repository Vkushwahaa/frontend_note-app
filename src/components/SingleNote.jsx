import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const SingleNote = ({ noteId, GetNotes, authTokens }) => {
  const [note, setNote] = useState("");
  let navigate = useNavigate();

  const getNote = async () => {
    if (noteId === "new") {
      setNote({ body: "" });
      return;
    }
    let response = await fetch(`${API_URL}/api/notes/${noteId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    setNote(data);
  };

  const updateNote = async () => {
    if (noteId === "new") return; 
    await fetch(`${API_URL}/api/notes/${noteId}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(note),
    });
    await GetNotes();
  };

  const createNote = async () => {
    let response = await fetch(`${API_URL}/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(note),
    });
    let newNote = await response.json();
    await GetNotes();
    navigate(`/home`, { replace: true });
  };

  const deleteNote = async () => {
    if (noteId === "new") return; 
    await fetch(`${API_URL}/api/notes/${noteId}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    await GetNotes();
    navigate("/home");
  };

  const handleNoteAction = async () => {
    if (noteId === "new" && note.body !== "") {
      await createNote();
    } else if (noteId !== "new" && note.body !== "") {
      await updateNote();
    } else if (noteId !== "new" && note.body === "") {
      await deleteNote();
    }
  };

  useEffect(() => {
    getNote();
  }, [noteId]);

  return (
    <div className="note-container">
      <textarea
        spellCheck="false"
        className="textarea"
        value={note.body}
        onChange={(e) => setNote({ ...note, body: e.target.value })}
        placeholder="Enter Title (first line) and Note (remaining lines)"
      ></textarea>
      <button className="done-button" onClick={handleNoteAction}>
        DONE
      </button>
      <button className="delete-button" onClick={deleteNote}>
        <i className="bi bi-trash3-fill"></i>
      </button>
    </div>
  );
};

export default SingleNote;
