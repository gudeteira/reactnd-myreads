import React from 'react';
import BookShelf from './Bookshelf';

const Library = (props) => ({
  render() {
    const books = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
    this.props.books.map(book =>
      books[book.shelf].push(book)
    );

    return (
      <div className="list-books-content">
        <BookShelf shelfName={"Currently Reading"} books={books['currentlyReading']}
                   onChangeShelf={this.props.onChangeShelf}/>
        <BookShelf shelfName={"Want to Read"} books={books['wantToRead']} onChangeShelf={this.props.onChangeShelf}/>
        <BookShelf shelfName={"Read"} books={books['read']} onChangeShelf={this.props.onChangeShelf}/>
      </div>
    )
  }
});

export default Library;