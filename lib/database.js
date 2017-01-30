const mongorito = require('mongorito');
const { Model } = mongorito;
const Promise = require('promise');
import async from './run';

class Book extends Model {
  collection() {
    return 'books';
  }
}

mongorito.connect('localhost:27017/Libris');

function connect() {
  async(function* () { yield mongorito.connect('mongodb://localhost:27017/Libris'); });
}

function disconnect() {
  async(function* () { yield mongorito.disconnect() });
}

function add(data) {
  var book = new Book(data);
  async(function*() {
    yield book.save();
  });
  return book;
}

function update(book, data) {
  for(var key in data)
    book.set(key, data[key]);
  async(function*() {
    yield book.save();
  });
  return book;
}

function findById(id) {
  return Book.findById(id);
}

function findAll(target=null, query=null, limit=null, skip=null) {
    var bookQuery;
    if(!target)
      return Book.all();
    else {
      if(!query)
        bookQuery = Book.where(target).exists();
      else
        bookQuery = Book.where(target, query);
      if(limit)
        bookQuery = bookQuery.limit(limit);
      if(skip)
        bookQuery = bookQuery.skip(skip);
      return bookQuery.find();
    }
}

function remove(book=null) {
  if(!book)
    throw new Error('Book needed');
  async(function* () {
    if(!_id in book)
      yield Book.remove(book);
    else
      yield book.remove();
  });
  return 'removed!';
}

const db = {
  add,
  update,
  find: findAll,
  findById,
  remove,
  connect,
  disconnect
}

module.exports = db;

