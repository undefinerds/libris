const Epub = require('epub');
const db = require('./database');

class Book {
  constructor(data) {
    if (typeof data === typeof '') {
      var metaCache = { url: data };
      data = {};
    } else if(typeof data === typeof {} && 'url' in data) {
      var metaCache = data;
    } else {
      throw "Path needed";
    }

    Object.assign(this, metaCache);
  }

  refresh() {
    const that = this;
    return new Promise((resolve, reject) => {
      db.find({ url: that.url })
        .then(res => {
          Object.assign(that, res);
          resolve(res);
        }, reject);
    });
  }

  edit(changes) {
    const that = this;
    //TO DO: sanitize changes
    return new Promise((resolve, reject) => {
      db.find('url', that.url)
        .then(oldBook => {
          oldBook = oldBook[0];
          const freshBook = db.update(oldBook, changes);
          Object.assign(that, freshBook);
          resolve(freshBook);
        }, reject);
    });
  }


  fetchMetadata() {
    const that = this;
    return new Promise((resolve, reject) => {
      this.read().then(epub => {
      const { metadata } = epub;
      let metaCache = {};
      db.find('url', that.url, 1)
        .then(book => {
          console.log(book);
            book = book[0];
            if(!book || book == undefined) {
              metaCache = metadata;
              metaCache.url = that.url;
              const b = db.add(metaCache);
              Object.assign(that, b);
              resolve(b);
            } else {
              Object.assign(that, book);
              Object.keys(metadata).forEach((meta) => {
                if(!(meta in book)) {
                  metaCache[meta] = metadata[meta];
                }
              });
              that.edit(metaCache, book).then(b => {
                Object.assign(that, b);
                resolve(b);
              }).catch(reject);
            }
        }, reject);
      }).catch(reject);
    });
  }

  read() {
    let book = new Epub(this.url, '/images/', '/chapter/');
    const promise = new Promise((resolve, reject) => {
      book.on('end', () => resolve(book));
      book.on('error', () => reject('error reading file'));
    });
    book.parse();
    return promise;
  }

  remove() {
    db.find({ id: this._id })
      .then(book => {
        if(book.length > 0)
          db.remove(book)
          .then(message => { console.log(message); })
          .catch(err => { console.error(err); });
      })
      .catch(err => { console.error(err); });
  }

}

module.exports = Book;
