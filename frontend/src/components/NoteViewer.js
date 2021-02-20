import React, { Fragment } from 'react';

class NoteViewer extends React.Component {
  

  noteEditHandler = () => {
    this.props.editClickHandler()
  }

  noteDeleteHandler = ({ noteId, selectedNote }) => {
    fetch(`http://localhost:3000/api/v1/notes/${noteId}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
      this.props.deleteNoteHandler(selectedNote)
    })
  }
  
  render() {
    return (
      <Fragment>
        <h2>{this.props.selectedNote.title}</h2>
        <p>{this.props.selectedNote.body}</p>
        <button onClick={this.noteEditHandler}>Edit</button>
        <button onClick={this.noteDeleteHandler}>Delete</button>
    </Fragment>
    );
  }
}

export default NoteViewer;
