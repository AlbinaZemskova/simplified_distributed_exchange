const { Trade } = require('./trade');

class OrderBook {
  constructor(buyOrders = [], sellOrders = [], trades = []) {
    this.buyOrders = buyOrders;
    this.sellOrders = sellOrders;
    this.trades = trades;
  }

  getOrders() {
    return {
      buyOrders: this.buyOrders,
      sellOrders: this.sellOrders
    }
  }

  addBuyOrder(order) {
    let countOfBuyOrders = this.buyOrders.length;
    let i;

    for (i = countOfBuyOrders - 1; i >=0; i--) {
      let buyOrder = this.buyOrders[i];
      if (buyOrder.price < buyOrder.price) {
        break;
      }
    }

    if (i === countOfBuyOrders - 1) {
      this.buyOrders.push(order);
    } else {
      this.buyOrders.splice(i + 1, 0, order);
      this.buyOrders[i] = order;
    }
  }

  addSellOrder(order) {
    let countOfSellOrders = this.sellOrders.length;
    let i;
    for (i = countOfSellOrders - 1; i >= 0; i--) {
      let sellOrder = this.sellOrders[i];
      if (sellOrder.price > order.price) {
        break;
      }
    }

    if (i === countOfSellOrders - 1) {
      this.sellOrders.push(order);
    } else {
      this.sellOrders.splice(i + 1, 0, order);
      this.sellOrders = order;
    }
  }

  removeBuyOrder(index) {
    this.buyOrders.splice(index,1);
  }

  removeSellOrder(index) {
    this.sellOrders.splice(index,1);
  }

  handleSellOrder(order) {
    let n = this.buyOrders.length;

    if (n !== 0 && this.buyOrders[n - 1].price >= order.price) {
      for (let i = n -1; i >=0; i--) {
        let buyOrder = this.buyOrders[i];
        if (buyOrder.price < order.price){
          break;
        }

        if (buyOrder.amount >= order.amount) {
          let newTrade = new Trade(order.id, buyOrder.id, order.amount, buyOrder.price);
          this.trades.push(newTrade);
          buyOrder.amount -= order.amount;
          if (buyOrder.amount === 0){
            this.removeBuyOrder(i);
          }

          return this.trades;
        }

        if (buyOrder.amount < order.amount) {
          let newTrade = new Trade(buyOrder.id, order.id, buyOrder.amount, buyOrder.price);
          this.trades.push(newTrade);
          order.amount -= buyOrder.amount;
          this.removeBuyOrder(i);
        }
      }
    }

    this.addSellOrder(order);
    return this.trades;
  }

  handleBuyOrder(order) {
    let n = this.sellOrders.length;

    if (n !== 0 || this.sellOrders[n - 1]?.price <= order.price) {
      for (let i = n - 1; i >= 0; i--) {
        let sellOrder = this.sellOrders[i];
        if (sellOrder.price > order.price) {
          break;
        }

        if (sellOrder.amount >= order.amount) {
          let newTrade = new Trade(order.id, sellOrder.id, order.amount, sellOrder.price);
          this.trades.push(newTrade);
          sellOrder.amount -= order.amount;
          if (sellOrder.amount === 0) {
            this.removeSellOrder(i);
          }

          return this.trades;
        }

        if (sellOrder.amount < order.amount) {
          let newTrade = new Trade(order.id, sellOrder.id, sellOrder.amount, sellOrder.price);
          this.trades.push(newTrade);
          order.amount -= sellOrder.amount;
          this.removeSellOrder(i);
        }
      }
    }

    this.addBuyOrder(order);
    return this.trades;
  }
}

module.exports = { OrderBook };