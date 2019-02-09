import React from 'react';
import {Link} from "react-router-dom";
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
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf shelfName={"Currently Reading"} books={books['currentlyReading']}
                     onChangeShelf={this.props.onChangeShelf}/>
          <BookShelf shelfName={"Want to Read"} books={books['wantToRead']} onChangeShelf={this.props.onChangeShelf}/>
          <BookShelf shelfName={"Read"} books={books['read']} onChangeShelf={this.props.onChangeShelf}/>
        </div>
        <div className="open-search">
          <Link to={'/search'}>Search books</Link>
        </div>
      </div>
    )
  }
});

export default Library;