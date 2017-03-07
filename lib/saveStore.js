import DB from './database';
var { ipcRenderer } = require('electron');

const Libris = DB('Libris');

export default function(prevState, nextState) {
  if(prevState !== nextState && (prevState.books !== nextState.books || prevState.config !== nextState.config) && nextState.books.length > 0 && nextState.config && nextState.config.directory && nextState.config.extensions) {
    Libris.set(nextState).then(() => {
      console.log('saved!');
      ipcRenderer.on('willClose', function(cb) {
        cb(true);
      });
    });
  }
}