[![paypal-invoices](https://s12.directupload.net/images/200912/re6mtglg.png)](#)

<p align="center">
  <b>Inoffical</b> reverse engineered wrapper with useful functions for managing and creating paypal invoices
</p>


<p align="center">
  <a><img alt="Build with heart" src="https://forthebadge.com/images/badges/built-with-love.svg"></a>
  <a><img alt="build with javascript" src="https://forthebadge.com/images/badges/made-with-javascript.svg"></a>
  <a><img alt="opens rouce" src="https://forthebadge.com/images/badges/open-source.svg"></a>
</p>


# Getting Started
You need to install [Node.JS](https://nodejs.org/en/download/)
And you need a paypal buisness account
```
$ git clone https://github.com/Intevel/paypal-invoices

$ cd paypal-invoices
```

## Quick Code Example
Here is a short code example to initialize a Invoice, all invoice configuration is saved in a config.
```javascript
const PayPalInvoices = require("./src");
const config = require("./config.json")


async function init() {
	const token = await PayPalInvoices.getToken(config.clientID, config.secretID);

	PayPalInvoices.createInvoice(token, "test@thatsfordevelopment.at", "test", "5", "1")
	PayPalInvoices.createInvoiceQRCode(token, "INV2-SQWP-6UB6-8JEM-EXF9")
}

init();
```

# Features
✔️ Strictly written in TypeScript  
✔️ Lightweight  
✔️ Fully supports the Discord API  

## Coming Features
☄️ Fully extendable plugins API  
☄️ Additional utilities  
☄️ CLI generator for new projects  
☄️ Custom ESLint configuration  

# Optional Libraries
There are multiple optional libraries which could be installed in addition to node-discord to improve performance.
- **erlpack** - Provides fast encoding and decoding for WebSocket payloads.
- **zlib-sync** - Compresses and decompresses WebSocket payloads before attempting to parse them.
