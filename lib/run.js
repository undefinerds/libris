const co = require('co');

export default function run(fn) {
  co(fn).catch((err) => {
    console.error(err);
  });
}
