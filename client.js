const { PeerRPCClient } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link');
const readLineSync = require('readline-sync')
const { getOrderDetails } = require("./utils/getOrderDetails");

const link = new Link({
  grape: 'http://127.0.0.1:30001',
  requestTimeout: 10000
});
link.start();

const peer = new PeerRPCClient(link, {})
peer.init();

const promisePeer = (...args) => {
  return new Promise((resolve, reject) =>
    peer.request(...args, (err, result) => {
      if (err) reject(err);

      resolve(result);
    })
  )
}

let userInput;
let price;
let amount;

(async () => {
  while (userInput !== '0') {
   console.log("Option #1 Choose for buying");
   console.log("Option #2 Choose for selling");
   console.log("Option #3 Show order book");
   userInput = readLineSync.question("Pick an option: ");

   if (userInput) {
     if (userInput === '0') {
       process.exit();
     }

     if (userInput === '1' || userInput === '2') {
       const result = getOrderDetails('buy');
       price = Number(result.price);
       amount = Number(result.amount);
     }

     try {
       const result = await promisePeer(
         'distributed_worker',
         { input: userInput, price, amount },
         { timeout: 10000 }
       );

       console.log(result);
     } catch (e) {
       console.log(e);
     }
   }
 }
})();
