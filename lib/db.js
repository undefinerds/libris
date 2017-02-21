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
  primaryKeys['id', 'url']
});

Book.validatePresenceOf('url');
Book.validatesUniquenessOf('url', {message: 'No url specified'});

module.exports = function() {
    Book.create(function(err) {
      if(err) console.error(err);
    });
    
    return {
      //Create if not exists
      create: (url) => new Promise((resolve, reject) => {
          Book.findOrCreate({ url: data.url }, data, (err, book) => {
          if(err) return reject(err);
            resolve(book);
          });
        }),
      //this force insertion, not recommended
      put: (data) => new Promise((resolve, reject) => {
        try {
          resolve(new Book(data));
        } catch(err) {
          reject(err);
        }
      }),
      getAll: () => new Promise((resolve, reject) => {
        try {
          resolve(Book.all());
        } catch(err) {
          reject(err);
        }
      }),

      get: (selector) => new Promise((resolve, reject) => {
        if(typeof id === typeof Number()) {
          Book.findById(selector, (err, book) => {
            if(err) return reject(err);
            resolve(book);
          });
        } else {
          Book.find(selector, (err, books) => {
            // stands there until we made a selector
            if(err) return reject(err);
            resolve(books);
          })
        }
      }),

      update: (id, data) => new Promise((resolve, reject) => {
        Book.update({
          where: { id }
        }, data, (err, book) => {
          if(err) return reject(err);
          resolve(err);
        });
      }),

      delete: (id) => new Promise((resolve, reject) => {
        Book.destroyById(id, (err) {
          if(err) return reject(err);
          resolve(true);
        });
      }),

      exists: (id) => new Promise((resolve, reject) => {
        Book.exists(id, (err, exists) => {
          if(err) return reject(err);
          resolve(exists);
        });
      })
    };
}
