const Promise = require('promise');
/*const Sequelize = require('sequelize');
const file = require('path').resolve(process.cwd(), 'Libris.db');
console.log(file);

const sequelize = new Sequelize('libris', 'libris', '1234', {  
  // seems that user and passwd are ignored because we're using sqlite:
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: file,
  logging: false

});

var Book = sequelize.define('Book', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  url: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  title: { type: Sequelize.STRING },
  author: { type: Sequelize.STRING },
  description: { type: Sequelize.TEXT },
  subject: { type: Sequelize.STRING },
  pubDate: { type: Sequelize.DATE },
  editorial: { type: Sequelize.STRING(80) },
  edition: { type: Sequelize.STRING },
  cover: { type: Sequelize.TEXT },
  chapters: { type: Sequelize.TEXT },
  metadata: { type: Sequelize.TEXT },
  added: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  views: {
    type: Sequelize.INTEGER.UNSIGNED,
    defaultValue: 0
  }
}, { freezeTableName: true });

Book.sync({force: false});

Book = sequelize.model('Book');

module.exports = {
      //Create if not exists
      create: (data) => new Promise((resolve, reject) => {
        console.log(data);
        Book.findOrCreate({ where: { url: data.url }, defaults: data })
        .spread((book, created) => {
            resolve(book);
          });
      }),

      createAll: (arr) => {
        console.log(arr);
        return Promise.all(arr).then((metaBooks) => {
          return metaBooks.map(data => new Promise((resolve, reject) => 
            sequelize
            .transaction(t => Book.create(data, {transaction: t}))
            .then(resolve)
            .catch(reject)
          ));
        });
      },

      //this force insertion, not recommended
      put: (data) => new Promise((resolve, reject) => {
        return Book.create(data).then(resolve).catch(reject);
      }),

      getAll: () => new Promise((resolve, reject) => {
        return Book.findAll().then(resolve).catch(reject);
      }),

      get: (selector, limit=undefined, offset=undefined) => new Promise((resolve, reject) => {
        if(typeof selector === typeof Number()) {
          return Book.findById(selector).then(resolve).catch(reject);
        } else {
          let query = {};
          for(var key in selector) {
            query[key] = {
              $like: `%${selector[key]}%`
            };
          }
          Book.findAndCountAll({ where: query, offset, limit }).then((result) => {
            if(result.rows.length === 1) {
              return resolve(result.rows[0]);
            } else {
              return resolve(result.rows);
            }
          }).catch(reject);
        }
      }),

      update: (id, data) => new Promise((resolve, reject) => {
        Book.findById(id).then((book) => {
          book.update(data).then(() => {
            return resolve(book);
          }).catch(reject);
        }).catch(reject);
      }),

      delete: (id) => new Promise((resolve, reject) => {
        Book.findById(id).then((book) => {
          return book.destroy();
        }).then(() => resolve(true)).catch(reject);
    })
}


  /*  
    return {
      create: (data) => new Promise((resolve, reject) => {
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
      getAll: () => Book.all(),

      get: (selector) => new Promise((resolve, reject) => {
        if(typeof selector === typeof Number()) {
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
        Book.destroyById(id, (err) => {
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
    */
