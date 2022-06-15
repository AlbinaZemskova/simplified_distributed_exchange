# Distributed Exchange


## Setup Project Locally

* Clone Repository

```bash
git clone `https://github.com/AlbinaZemskova/simplified_distributed_exchange.git`
cd simplified_distributed_exchange
```

* Setting up the DHT
```bash
npm i -g grenache-grape
```
* boot two grape servers
```
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```
* Install dependencies `npm i`
* Start server `node server`
* Start Client `node client`

