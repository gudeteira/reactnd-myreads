import React from 'react';
import {Link, Route} from "react-router-dom";
import './App.css';
import * as BooksAPI from './BooksAPI'
import Library from './Library'
import Searcher from './Searcher';


class BooksApp extends React.Component {

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({books: books}));
    });
  }

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
        <Route path={'/'} exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Library books={this.state.books} onChangeShelf={this.onChangeShelf}/>

            <div className="open-search">
              <Link to={'/search'}>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path={'/search'} render={() => (
          <Searcher books={this.state.books} onChangeShelf={this.onChangeShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
