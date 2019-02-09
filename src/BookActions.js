import React, {Component} from "react";

class BookActions extends Component {

  state = {
    value: this.props.book.shelf
  };
  handleOnChange = (e) => {
    const value = e.target.value;
    this.setState({value: value});
    this.props.onChangeShelf(this.props.book, value);
  };

  render() {
    return (<div className="book-shelf-changer">
      <select value={this.state.value || 'none'} onChange={this.handleOnChange}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>);
  }
}

export default BookActions;