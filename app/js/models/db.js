import Mongorito, { Model } from 'mongorito';

const Book = Model.extend({collection: 'books'});

function connectDB() {
    Mongorito.connect('localhost/Libris');
}

function disconnectDB() {
    Mongorito.disconnect();
}

export function createBook(title=null, author=null, url=null, edition=null, gender=[], editorial=null, pubDate=null) {
    connectDB();
    if(title && author && url) {
        const book = new Book({
            title,
            author,
            url,
            edition,
            gender,
            editorial,
            pubDate: new Date(pubDate)
        });
        yield book.save();
        return book;
    }
    disconnectDB();
}

export function updateBook(id, options) {
    connectDB();
    const book = yield Book.where('_id', id).find();
    if(book) {
        for (let key in options) {
            value = options[key];
            book.set(key, value));
        }
        yield book.save();
        return book;
    }
    disconnectDB();
}