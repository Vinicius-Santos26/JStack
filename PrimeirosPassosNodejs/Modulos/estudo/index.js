const printMessage = require('./printMessage');
const { generateMessage } = require('./generateMessage');

printMessage(generateMessage('add', 1, 2));
printMessage(generateMessage('subtract', 8, 2));
printMessage(generateMessage('multiply', 5, 9));
printMessage(generateMessage('divide', 10, 2));

printMessage(generateMessage('sum', 10, 2));