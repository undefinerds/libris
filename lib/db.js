const Promise = require('promise');
const caminte = require('caminte');

const file = require('path').resolve(process.cwd(), 'Libris.db');

const config = {
  driver: 'sqlite3',
  database: file
};

var schema = new caminte.Schema(config.driver, config);

var Book = schema.define('Book', {
  id: { type: schema.Number },
  url: { type: schema.Text },
  title: { type: schema.Text },
  author: { type: schema.Text },
  description: { type: schema.Text },
  subject: { type: schema.Text },
  date_published: { type: schema.Date },
  editorial: { type: schema.Text },
  edition: { type: schema.Text },
  cover: { type: schema.Text },
  chapters: { type: schema.JSON },
  metadata: { type: schema.JSON },
  added: {
    type: schema.Date,
    default: Date.now()
  },
  views: {
    type: schema.Integer,
    default: 0
  }
}, {
  primaryKeys['id']
});

Book.validatePresenceOf('url');
Book.validatesUniquenessOf('url', {message: 'No url specified'});

const exportable = function() {
  const promise = new Promise((resolve, reject) => {
    Book.create(function(err) {
      if(err) return reject(err);
    });
    function create(data) {
      Book.findOrCreate({ url: data.url }, data, (err, book) => {
        if(err) return reject(err);
        resolve(book);
      });
    }
    function put(data) {
      resolve(new Book(data));
    } //this force insertion, not recommended
    function getAll() {
      resolve(Book.all());
    }
    function get(selector) {
      if(typeof id === typeof Number()) {
        Book.findById(selector, (err, book) => {
          if(err) return reject(err);
          resolve(book);
        });
      } else {
        Book.find(selector, (err, books) => { // stands there until we made a selector
          if(err) return reject(err);
          resolve(books);
        })
      }
    }

    function update(id, data) {
      Book.update({
        where: { id }
      }, data, (err, book) => {
        if(err) return reject(err);
        resolve(err);
      });
    }
    function delete(id) {
      Book.destroyById(id, (err) {
        if(err) return reject(err);
        resolve(true);
      });
    }
    function exists(id) {
      Book.exists(id, (err, exists) => {
        if(err) return reject(err);
        resolve(exists);
      });
    }
}
