import PropTypes from 'prop-types';
import React from 'react';
import BookActions from './BookActions';


const Book = () => ({

  render() {
    const {book} = this.props;
    const bookCoverStyle = {
      width: 128,
      height: 193
    };
    if (book.imageLinks) {
      bookCoverStyle['backgroundImage'] = `url(${book.imageLinks.thumbnail})`;
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={bookCoverStyle}>
          </div>
          <BookActions book={book} shelf={book.shelf} onChangeShelf={this.props.onChangeShelf}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.map(author => <p key={author}>{author}</p>)}</div>
      </div>
    );
  }
});
Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}
export default Book;
