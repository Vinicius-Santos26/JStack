const os = require('os');

const {printName, lastName} = require('./printName');

printName("Hello world " + lastName);

console.log(os.type());