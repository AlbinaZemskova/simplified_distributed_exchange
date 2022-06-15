const { PeerRPCServer } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");
const { OrderBook } = require('./models/orderBook');
const { Order } = require("./models/order");

const orderBook = new OrderBook();

const link = new Link({
  grape: 'http://127.0.0.1:30001'
});

link.start();
const peer = new PeerRPCServer(link, {})
peer.init();

const service = peer.transport('server')
service.listen(1337);

setInterval(() => {
  link.announce('distributed_worker', service.port, {})
}, 1000);

service.on('request', (rid, key, payload, handler) => {
  if (payload.input === '1') {
    const order = new Order(payload.price, payload.amount, 'buy');
    const trade = orderBook.handleBuyOrder(order);

    handler.reply(null, { order, trade });
  } else if (payload.input === '2') {
    const order = new Order(payload.price, payload.amount, "sell");

    const trade = orderBook.handleSellOrder(order);

    handler.reply(null, { order, trade });
  } else if (payload.input === '3') {
    handler.reply(null, orderBook);
  }
});
