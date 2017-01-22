const mongoose = require('mongoose');
const { Schema } = mongoose;

function bookshelf() {

  const promise = new Promise((resolve, reject) => {
    mongoose.connection
    .on('error', (e='Error connecting to Mongoose') => {
      reject(e);
    })
    .once('open', () => {
      const bSchema = new Schema({
        title: String,
        author: String,
        genre: String,
        pubDate: Date,
        url: {
          type: String,
          required: true,
          unique: true
        },
        language: String,
        editorial: String,
        saved: Date,
        views: Number
      });

      bSchema.pre('save', function(next) {
        this.saved = new Date();
        this.views = 0;
        next();
      });
      const Bookshelf = mongoose.Model('Bookshelf', bSchema);
      mongoose.connect(`mongodb://127.0.0.1:27017/Libris`);
      resolve(Bookshelf);
    });
    return promise;
  });
}

module.exports = async function core() {
  try {
    var book = await bookshelf();
    return book;
  } catch(e) {
    console.error(e);
    return ;
  }
}
