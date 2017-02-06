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
      .filter(i => [this.props.books[i].title, this.props.books[i].author]
      .join(' ').toLowerCase().includes(value)) :
      this.props.books.map((_, i) => i);
    this.props.updateForm(className, matches);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
    <div style={styles}>
      <form className={this.props.form.style} id="search" name="search" onSubmit={this.handleSubmit}>
        <input type="text" id="searchbox" name="searchbox" onChange={this.handleChange.bind(this)} />
      <label target="searchbox">
        <img className="center" src="../glass.png" alt="lupa" />
      </label>
      </form>
      <SearchGrid {...this.props} indexGrid={this.props.form.matches} />
      </div>
    )
  }
}

export default Main;
