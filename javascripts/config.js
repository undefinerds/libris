const { readFileSync: read } = require('fs');
const { join } = require('path');
let dir = join(process.env.PWD, 'config.json');
export default JSON.parse(read(dir));
