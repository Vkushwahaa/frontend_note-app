import ListItem from "./ListItem";

const NoteList = ({ notes, onSelectNote }) => {
  return (
    <div className="notelist-container">
      {notes.map((note, index) => (
        <ListItem
          key={note.id}
          note={note}
          index={index}
          onSelectNote={onSelectNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
