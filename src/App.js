import React from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI'
import Library from './Library'
import Searcher from './Searcher';


class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []

  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({books: books}));
    });
  }

  onCloseSearch = () => {
    this.setState({showSearchPage: false})
  };

  onChangeShelf = (book, shelf) => {
    console.log(`move ${book.id} to shelf ${shelf}`);
    BooksAPI.update(book, shelf).then(res => {
      console.log(res);
      this.setState(currentState => {
        let books = currentState.books;
        if ('none' === shelf) {
          books = currentState.books.filter(b => b.id !== book.id);
        } else {
          const index = books.findIndex(b => b.id === book.id);
          if (-1 === index) {
            book['shelf'] = shelf;
            books.push(book);
          } else {
            books[index].shelf = shelf;
          }
        }
        return {
          books: books
        }
      });
    });
  };


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Searcher onCloseSearch={this.onCloseSearch} books={this.state.books} onChangeShelf={this.onChangeShelf}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Library books={this.state.books} onChangeShelf={this.onChangeShelf}/>

            <div className="open-search">
              <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
