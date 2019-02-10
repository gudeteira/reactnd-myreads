import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
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
    BooksAPI.update(book, shelf).then(res => {
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
        <Switch>
          <Route path={'/'} exact render={() => (
            <Library books={this.state.books} onChangeShelf={this.onChangeShelf}/>
          )}/>
          <Route path={'/search'} render={() => (
            <Searcher books={this.state.books} onChangeShelf={this.onChangeShelf}/>
          )}/>
          <Route path={'/404'} render={() => (
            <h1>Oops, What you are looking for is not here!</h1>
          )}/>
          <Redirect from='*' to='/404'/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
