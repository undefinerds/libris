import React, { Component } from 'react';
import { Link } from 'react-router';
import Search from './Search';
import styles from '../../stylesheets/main.css';

// Loader :)

class Main extends Component {

  handleChange(e) {
    let value = e.target.value;
    console.log(value);
    let className = (value !== '') ? 'typed' : '';
    console.log(className);
    let matches = this.props.filter(book => [book.title.toLowerCase(), book.author.toLowerCase()]
      .join(' ').includes(value));
    this.props.updateForm(value, matches, className);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
    <div style={styles}>
      <form className={this.props.form.style} id="search" name="search" onSubmit={this.handleSubmit}>
        <input type="text" id="searchbox" name="searchbox" value={this.props.form.value} onChange={e => this.handleChange.bind(this, e)} />
      <label target="searchbox">
        <img className="center" src="../glass.png" alt="lupa" />
      </label>
      </form>
      <Search {...this.props} bookGrid={this.props.matches} />
      </div>
    )
  }
}

export default Main;
