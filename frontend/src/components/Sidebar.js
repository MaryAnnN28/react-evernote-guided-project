import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {

  state = {
    title: "enter note title", 
    body: "enter note details...", 
    user: ""
  }



  handleNewClick = () => {
    let noteObj = this.state
    this.props.newNoteHandler(noteObj)
  }

  render() {
    return (
      <div className='master-detail-element sidebar'>
        <NoteList
          allNotes={this.props.allNotes}
          sidebarClick={this.props.sidebarClick} 
          />
        <button onClick={this.handleNewClick}>New</button>
      </div>
    );
  }
}

export default Sidebar;
