const mongoose = require('mongoose');
const { Schema } = mongoose;

const options = {
  host: process.env.HOST || 'localhost',
  database: process.env.DATABASE || 'Libris'
}

mongoose.connect(`mongodb://${ options.host }/${ options.database }`);
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

const bookshelf = new Promise((resolve, reject) => {
  mongoose.connection
  .on('error', () => {
    reject('Error');
  })
  .once('open', function () {
    const Bookshelf = mongoose.Model('Bookshelf', bSchema);
    resolve(Bookshelf);
  });
});

module.exports = async function() {
  return await bookshelf();
}