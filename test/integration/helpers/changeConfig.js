var fs = require('fs');
var arguments = require('./arguments.js');
var config = require('./config.json');
var newConfig = arguments.parse(process.argv.slice(2));

for(var k in newConfig) {
    config[k] = newConfig[k];
}

fs.writeFileSync('config.json', JSON.stringify(config));