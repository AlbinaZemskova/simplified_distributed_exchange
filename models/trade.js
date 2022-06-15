class Trade {
  constructor(takerOrderId, makerOrderId, amount, price) {
    this.takerOrderId = takerOrderId;
    this.makerOrderId = makerOrderId;
    this.amount = amount;
    this.price = price;
  }
}

module.exports = { Trade };