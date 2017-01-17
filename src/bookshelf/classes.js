const Epub = require('epub');
const BookCollection = require('./db')();

class Book {
  constructor(data) {
    if (typeof data === typeof '') {
      var metaCache = { url: data };
      data = {};
    } else if(typeof data === typeof {} && 'url' in data) {
      var metaCache = {
        url: data.url
      }
    } else {
      throw "Path needed";
    }

    this.url = metaCache.url;
    
    const metadata = this.getMetadata();
    Object.assign(metaCache, metadata, data);
    Object.assign(this, metaCache);
    BookCollection(metaCache).save((err) => {
      if(err)
        throw err;
      this.update();
    });
  }

  update() {
    BookCollection.find({ url: this.url }, function(err, book) {
      if(err) throw err;
      Object.assign(this, book);
    });
  }

  edit(changes) {
    //TO DO: sanitize changes
    BookCollection.findByIdAndUpdate(this._id, changes, (err, freshBook) => {
      if(!err)
        Object.assign(this, freshBook);
    });    
  }

  read() {
    let book = new Epub(this.url, '/image/', '/chapter/');
    return new Promise((resolve, reject) => {
      book.on('end', () => resolve(book));
      book.on('error', () => reject('error reading file'));
    });
    book.parse();
  }

  async getMetadata() {
    const { metadata } = await this.read();
    return metadata;
  }

  remove() {
    BookCollection.findByIdAndRemove(this._id, function(err) {
      if(!err)
        return "Removed!";
    });
  }
  
}