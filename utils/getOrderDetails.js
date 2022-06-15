const readLineSync = require("readline-sync");

function getOrderDetails() {
  const amount = readLineSync.question( 'Quantity: ');
  const price = readLineSync.question('Price: ');

  return { price, amount };
}

module.exports = { getOrderDetails };