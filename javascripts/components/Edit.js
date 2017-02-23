import React, { Component } from 'react';

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
    Object.assign(this.state, {});

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(key, e) {
    this.setState({
      ...state,
      [key]: e.target.value
    })
  }

  render() {
    return (
      <div id="edit">
        <header>
          <h1>{this.state.title}</h1>
        </header>
        <form id="bookForm">
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
          <label>
            <span>Descripción</span>
            <input value={this.state.description} onChange={(e) => this.handleUpdate('description', e)} />
          </label>
        </form>
      </div>
    )
  }
}

export default Edit;