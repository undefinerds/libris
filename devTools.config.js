var installExtension = require('electron-devtools-installer');
const extensions = ['REACT_DEVELOPER_TOOLS'];


module.exports = function () {
  extensions.forEach(ext => {
  installExtension.default(installExtension[ext])
    .then((name) => console.log(`Using extension ${name}`))
    .catch((err) => console.error(err));
  });
}
