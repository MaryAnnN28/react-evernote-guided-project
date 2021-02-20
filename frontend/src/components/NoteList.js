import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {

  const renderNotes = () => {
    return props.allNotes.map(note => {
      return <NoteItem key={note.id} note={note} sidebarClick={props.sidebarClick}/>
    })
  }
  return (
    <ul>
      {renderNotes()}
    </ul>
  );
}

export default NoteList;
