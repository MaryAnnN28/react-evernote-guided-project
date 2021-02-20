import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {

  state = {
    allNotes: [],
    selectedNote: {},
    beenClicked: false, 
    editBeenClicked: false,
    searchValue: ""
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/notes')
      .then(res => res.json())
      .then(notesData => this.setState({ allNotes: notesData })
    )
  }

  sidebarClick = (noteObj) => {
    this.setState({ selectedNote: noteObj, beenClicked: true, editBeenClicked: false})
  }

  editClickHandler = () => {
    this.setState({ editBeenClicked: !this.state.editBeenClicked })
  }

  cancelClickHandler = () => {
    this.setState({ editBeenClicked: false })
  }
  


  editNoteSubmitHandler = (noteId, noteObj) => {
    fetch(`http://localhost:3000/api/v1/notes/${noteId}`, {
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(noteObj)
    })
      .then(res => res.json())
      .then(updatedNoteObject => {
        let updatedNotes = [...this.state.allNotes]
        const index = updatedNotes.findIndex(noteObject => noteObject.id === noteId)
        updatedNotes[index] = updatedNoteObject
        this.setState({ allNotes: updatedNotes, selectedNote: updatedNoteObject })
      })
    }

  
  newNoteHandler = (noteObj) => {
    fetch('http://localhost:3000/api/v1/notes', {
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }, 
      method: "POST", 
      body: JSON.stringify(noteObj)
    })
      .then(res => res.json())
      .then(newNote => {
      this.setState({ allNotes: [...this.state.allNotes, newNote] })
    })
  }
  
  searchNotes = () => {
    let filteredNotes = [...this.state.allNotes]
    if (this.state.searchValue !== "") {
      filteredNotes = filteredNotes.filter(note => note.title.toLowerCase().includes(this.state.searchValue.toLowerCase()) || note.body.toLowerCase().includes(this.state.searchValue.toLowerCase()))
      return filteredNotes
    } else {
      return filteredNotes
    }
  }

  searchChangeHandler = (event) => {
    this.setState({ searchValue: event.target.value })
  }

  deleteNoteHandler = (deletedNote) => {
    this.setState({
      allNotes: this.state.allNotes.filter(noteObj => noteObj !== deletedNote)
    })
  }

  
  deleteRecipe = (deletedRecipe) => {
    this.setState({
      recipes: this.state.recipes.filter(recipe => recipe !== deletedRecipe)
    })
  }


  render() {
    return (
      <Fragment>
        <Search 
          searchValue={this.state.searchValue}
          searchChangeHandler={this.searchChangeHandler}
        />
        <div className='container'>
          
          <Sidebar
            allNotes={this.searchNotes()}
            sidebarClick={this.sidebarClick} 
            newNoteHandler={this.newNoteHandler}
          />
          
          <Content
            selectedNote={this.state.selectedNote} 
            beenClicked={this.state.beenClicked}
            editClickHandler={this.editClickHandler}
            editBeenClicked={this.state.editBeenClicked}
            editSubmitHandler={this.editNoteSubmitHandler}
            cancelClicked={this.cancelClickHandler}
            deleteNoteHandler={this.deleteNoteHandler}
          />
          
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
