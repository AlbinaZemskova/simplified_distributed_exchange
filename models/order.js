class Order {
  constructor(price, amount, side) {
    this.id = Math.random().toString().slice(2);
    this.price = price;
    this.amount = amount;
    this.side = side;
  }
}

module.exports = { Order };