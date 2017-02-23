import React, { Component } from 'react';
import { Link } from 'react-router';
import SearchGrid from './SearchGrid';
import styles from '../../stylesheets/main.css';

// Loader :)

class Main extends Component {

  handleChange(e) {
    let value = e.target.value.toLowerCase();
    let className = (value !== '') ? 'typed' : '';
    let matches = (value !== '') ? this.props.books
      .map((_, i) => i)
      .filter(i => [this.props.books[i].title, this.props.books[i].author, this.props.books[i].subject, this.props.books[i].description]
      .join(' ').toLowerCase().includes(value)) :
      this.props.books.map((_, i) => i);
    this.props.updateForm(className, matches);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  showOptions() {
    return ;
  }

  render() {
    return (
      <div style={styles}>
        <div id="search" className={this.props.form.style}>
          <nav>
            <button id="help" onClick={this.props.toggleWelcome}><i className="fa fa-question-circle-o fa-2x "></i></button>
            <button id="options" onClick={this.showOptions.bind(this)}><i className="fa fa-cog fa-2x"></i></button>
          </nav>
          <header><h1>Libris</h1></header>
          <form id="searchBox" name="searchBox" onSubmit={this.handleSubmit}>
            <input type="text" id="searchbox" name="searchbox" onChange={this.handleChange.bind(this)} />
          <label target="searchbox">
            <img className="center" src="../glass.png" alt="lupa" />
          </label>
          </form>
        </div>
        <SearchGrid {...this.props} indexGrid={this.props.form.matches} />
      </div>
    )
  }
}

export default Main;
