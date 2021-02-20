import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';


class Content extends Component {
  state = {
    saveBeenClicked: false, 
  }

  renderContent = () => {
    const noteObj = this.props.selectedNote

    if (this.props.editBeenClicked) {
      return <NoteEditor
        noteId={noteObj.id}
        selectedNote={noteObj}
        defaultTitleValue={noteObj.title}
        defaultBodyValue={noteObj.body}
        submitHandler={this.props.editSubmitHandler}
        cancelClicked={this.props.cancelClicked} />;
    } else if (this.props.beenClicked === true) {
      return <NoteViewer
        editClickHandler={this.props.editClickHandler} 
        selectedNote={noteObj} 
        noteId={noteObj.id}
        deleteNoteHandler={this.props.deleteNoteHandler}
        />;
    } else {
      return <Instructions />;
    }
  }

  render() {
    return (
      <div className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
