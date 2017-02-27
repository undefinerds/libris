import React, { Component } from 'react';
import styles from '../../stylesheets/form.css';
class Edit extends Component {
  constructor(props) {
    super(props);
    const { book } = this.props;
    this.state = {
      title: book.title || '',
      author: book.author || '',
      subject: book.subject || '',
      description: book.subject || '',
      edition: book.edition || '',
      pubDate: book.pubDate || '',
      editorial: book.editorial || ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    return this.props.onSubmit(this.state);
  }

  handleUpdate(key, e) {
    this.setState({
      ...this.state,
      [key]: e.target.value
    })
  }

  render() {
    return (
      <div id="edit">
        <header>{this.state.title}</header>
        <form id="bookForm" onSubmit={this.handleSubmit}>
        <div className="left">
          <label>
            <span>Título</span>
            <input value={this.state.title} onChange={(e) => this.handleUpdate('title', e)} />
          </label>
          <label>
            <span>Autor</span>
            <input value={this.state.author} onChange={(e) => this.handleUpdate('author', e)} />
          </label>
          <label>
            <span>Género</span>
            <input value={this.state.subject} onChange={(e) => this.handleUpdate('subject', e)} />
            <span>Separarlos con comas, ejemplo: <em>drama, fantasía, clásico</em></span>
          </label>
          <label>
            <span>Fecha de Publicación</span>
            <input value={this.state.pubDate} onChange={(e) => this.handleUpdate('pubDate', e)} />
          </label>
          <label>
            <span>Edición</span>
            <input value={this.state.edition} onChange={(e) => this.handleUpdate('edition', e)} />
          </label>
          <label>
            <span>Editorial</span>
            <input value={this.state.editorial} onChange={(e) => this.handleUpdate('editorial', e)} />
          </label>
          </div>
          <div className="right">
          <label>
            <span>Descripción</span>
            <input value={this.state.description} onChange={(e) => this.handleUpdate('description', e)} />
          </label>
          </div>
          <input className="clearfix" type="submit" value="Actualizar" />
        </form>
      </div>
    )
  }
}

export default Edit;
