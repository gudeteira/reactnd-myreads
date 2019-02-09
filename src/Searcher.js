import _ from 'lodash';
import React, {Component} from 'react';
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class Searcher extends Component {

  state = {
    books: [],
    error: ''
  };

  constructor(props) {
    super(props);
    this.handleSearch = _.debounce(this.handleSearch, 300);
  }

  handleSearch = (query) => {
    console.log('Query: ', query);
    this.search(query.trim());
  };

  search = (query) => {
    if (query.length === 0) {
      this.setState(() => ({error: '', books: []}));
      return;
    }
    BooksAPI.search(query, 15).then(books => {

      if (books.error) {
        this.setState(() => ({error: books.error, books: []}));
      } else {
        this.setState({books});
      }
    });
  };

  render() {

    const books = this.state.books.map(book => (
      <li key={book.id}>
        <Book book={book} onChangeShelf={this.props.onChangeShelf}/>
      </li>
    ));
    const emptyMessage = this.state.error ? `Nothing to show: ${this.state.error}` : 'Nothing to show';

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.props.onCloseSearch()}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text"
                   placeholder="Search by title or author"
                   defaultValue={""}
                   onChange={event => this.handleSearch(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length > 0 ? books : <li>{emptyMessage}</li>}
          </ol>
        </div>
      </div>
    )
  }
}

export default Searcher;