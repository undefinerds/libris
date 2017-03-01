import React, { Component } from 'react';
import { Link } from 'react-router';
import SearchGrid from './SearchGrid';
import styles from '../../stylesheets/main.css';
import Modal from './Modal';

// Loader :)

class Main extends Component {

  constructor(props) {
    super(props);
    this.formats = ['epub', 'pdf'];
    this.state = {
      showOptions: false,
      optionValues: {
        ...this.props.config,
        extensions: {
          epub: !!this.props.config.extensions.includes('epub'),
          pdf: !!this.props.config.extensions.includes('pdf')
        }
      }
    };
    this.optionsModal = this.optionsModal.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

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

  handleOptions(e) {
    e.preventDefault();
    console.log(this.state);
    extensions = Object.keys(this.state.optionValues.extensions).filter((name) => this.state.optionValues.extensions[name]);
    this.props.updateConfig({
      ...this.state.optionValues,
      extensions
    });
    this.props.updateBooks(this.props.books.map(book => {
      book.hidden = extensions.includes(book.type);
      return book;
    }));
    this.setState({ ...this.state,
    showOptions: false });
  }

  updateOptions(key, e, checkbox) {
    this.setState({
      ...this.state,
      optionValues: {
        ...this.state.optionValues,
        [key]: !!(checkbox) ? {
          ...this.state.optionValues[key],
          [e]: !this.state.optionValues[key][e]
        } : e.target.value
      }
    })
  }

  optionsModal() {
    return (
      <Modal onClose={() => this.setState({...this.state, showOptions: false })}>
        <form onSubmit={this.handleOptions.bind(this)}>
          <label>Fuente 
            <input type="text" name="fontFamily" value={this.state.optionValues.fontFamily} onChange={(e) => this.updateOptions('fontFamily', e)} />
          </label>
          <span>Formatos</span>
          {this.formats.map((format, i) =>
            <label key={i}>
              <input type="checkbox" value={format} checked={this.state.optionValues.extensions[format]} onChange={(e) =>this.updateOptions('extensions', format, true)} /> 
              {format}
            </label>)}
          <input type="submit" label="Actualizar" />
        </form>
      </Modal>
    )
  }

  render() {
    return (
      <div style={styles}>
        <div id="search" className={this.props.form.style}>
          <nav>
            <button id="help" onClick={this.props.toggleWelcome}><i className="fa fa-question-circle-o fa-2x "></i></button>
            <button id="options" onClick={() => this.setState({...this.state, showOptions: true})}><i className="fa fa-cog fa-2x"></i></button>
          </nav>
          <header><h1>Libris</h1></header>
          <form id="searchBox" name="searchBox" onSubmit={this.handleSubmit}>
            <input type="text" id="searchbox" name="searchbox" onChange={this.handleChange.bind(this)} />
          <label target="searchbox">
            <img className="center" src="../glass.png" alt="lupa" />
          </label>
          </form>
        </div>
        {this.state.showOptions && this.optionsModal()}
        <SearchGrid {...this.props} indexGrid={this.props.form.matches} />
      </div>
    )
  }
}

export default Main;
