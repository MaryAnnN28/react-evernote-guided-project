import React from 'react';

class NoteItem extends React.Component {

  handleClick = () => {
    this.props.sidebarClick(this.props.note)
  }

  noteCaption = (body, length, ending) => {
    if (length == null) {
      length = 26
    }
    if (ending == null) {
      ending = '...'
    }
    if (body.length > length) {
      return body.substring(0, length - ending.length) + ending
    } else {
      return body
    }
  }

  render() {
    return (     
    <li onClick={this.handleClick}>
    <h2>{this.props.note.title}</h2>
    <p>{this.noteCaption(this.props.note.body, 45, "...click to read")} </p>
  </li>

)
}
}

export default NoteItem;
