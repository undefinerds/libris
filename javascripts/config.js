const { readFileSync: read } = require('fs');
const { join } = require('path');
let dir = join(process.cwd(), 'config.json');
export default JSON.parse(read(dir));
