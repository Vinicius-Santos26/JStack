const { add, subtract, multiply, divide } = require('./calculator');

exports.generateMessage = (operation, value1, value2) => {
  let result;
  switch (operation) {
    case 'add':
      result = add(value1, value2);
      break;
    case 'subtract':
      result = subtract(value1, value2);
      break;
    case 'multiply':
      result = multiply(value1, value2);
      break;
    case 'divide':
      result = divide(value1, value2);
      break;
    default:
      return 'Error: Invalid operation';
  }

  return `The result of operation ${operation} with ${value1} and ${value2} is ${result}`;
};