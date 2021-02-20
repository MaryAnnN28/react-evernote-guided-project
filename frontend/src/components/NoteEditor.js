import React, { Component } from 'react';

class NoteEditor extends Component {

  state = {
    title: this.props.defaultTitleValue, 
    body: this.props.defaultBodyValue 
  }

  saveNoteEdit = (event) => {
    event.preventDefault()
    this.props.submitHandler(this.props.noteId, this.state)
    this.props.cancelClicked()
  }

  editNoteTitle = (event) => {
    this.setState({title: event.target.value})
  }

  editNoteBody = (event) => {
    this.setState({body: event.target.value})
  }

  handleClick = (event) => {
    this.props.cancelClicked()
  }


  render() {
    return (
      <form className="note-editor" onSubmit={this.saveNoteEdit}>
        
        <input type="text" name="title" value={this.state.title} onChange={this.editNoteTitle} />

        <textarea name="body" value={this.state.body} onChange={this.editNoteBody} />

        <div className="button-row">
          
          <input className="button" type="submit" value="Save" />

          <button type="button" onClick={this.handleClick}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
