const mongoose = require('mongoose');
const { Schema } = mongoose;

const model = new Promise((resolve, reject) => {
  mongoose.connect('mongodb://127.0.0.1:27017/Libris');
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
      resolve(Bookshelf);
    });
    return promise;
});

function db() {
  add(...data) {
    model.done(Bookshelf => {
      Book
    });
  }
