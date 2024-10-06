import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import NotesList from "../components/NotesList";
import SingleNote from "../components/SingleNote";
import AddButton from "../components/AddButton";
import ListItem from "../components/ListItem";
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  let { authTokens } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [list,setlist]=useState(true)

  const GetNotes = async () => {
    let response = await fetch(`${API_URL}/api/notes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    setNotes(data);
  };

  const handleSelectNote = (noteId) => {
    setSelectedNoteId(noteId);
    setIsAddingNote(false); 
  };

  const handleAddNote = () => {
    setSelectedNoteId("new"); 
    setIsAddingNote(true);
  };

  useEffect(() => {
    GetNotes();
  }, []);

  const handleListView = ()=>{
    setIsAddingNote(!list)
  }

  return (
    <div>
      <AddButton onAddNote={handleAddNote} />
      <div className="home-container">
        <i className="bi bi-list" onClick={handleListView}></i>
        <NotesList notes={notes} onSelectNote={handleSelectNote} />
        {(isAddingNote || selectedNoteId) && (
          <SingleNote
            noteId={selectedNoteId}
            GetNotes={GetNotes}
            authTokens={authTokens}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
