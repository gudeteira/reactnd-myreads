import PropTypes from 'prop-types';
import React from 'react';
import Book from './Book'

const Bookshelf = () => ({

  render() {
    const {shelfName, books, onChangeShelf} = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books && books.map(book => (
                <li key={book.id}>
                  <Book book={book} onChangeShelf={onChangeShelf}/>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
});

Bookshelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}
export default Bookshelf;