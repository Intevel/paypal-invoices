[![paypal-invoices](https://s12.directupload.net/images/200912/re6mtglg.png)](#)

<p align="center">
  <b>Inoffical</b> reverse engineered wrapper with useful functions for managing and creating paypal invoices
  This project is in no way affiliated with, authorized, maintained, sponsored or endorsed by PayPal or any of its affiliates or subsidiaries. This is an independent and unofficial software. Use at your own risk.
</p>


<p align="center">
  <a><img alt="Build with heart" src="https://forthebadge.com/images/badges/built-with-love.svg"></a>
  <a><img alt="build with javascript" src="https://forthebadge.com/images/badges/made-with-javascript.svg"></a>
  <a><img alt="opens rouce" src="https://forthebadge.com/images/badges/open-source.svg"></a>
</p>


![Getting started](https://s12.directupload.net/images/200912/4awasu66.png)
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

---
![Features](https://s12.directupload.net/images/200907/9m8qldwi.png)
- **API Authorization** *(Get Api Token)*
- **Manage Invoices** (Create, Delete, and more)
- **Create QR-Codes** (Invoice QR-Codes which you can scan and then pay)


---

