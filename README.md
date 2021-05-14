# paypal-invoices

Inoffical wrapper with useful functions for managing and creating paypal invoices This project is in no way affiliated with, authorized, maintained, sponsored or endorsed by PayPal or any of its affiliates or subsidiaries. This is an independent and unofficial software. Use at your own risk.

## Installation

```
npm i @intevel/paypal-invoices
```

## Create an Invoice:

```js
const InvoiceHandler = require("paypal-invoices");

var invoice = await InvoiceHandler.createInvoice({
	clientID: "-",
	secretID: "-",
	receiver: "mail@receiver.de",
	tax_id: "TAXID",
	details: {
		currency_code: "EUR",
	},
	tax_name: "Sales Tax",
	tax_percent: "7.25",
	tax_calculated_after_discount: false,
	tax_inclusive: true,
	invoicer: {
		businessName: "My Company",
		invoicerEmailAdress: "payment@mycompany.de",
		website: "mycompany.de",
		logoUrl: "myCompanylogo.de",
		additionalNotes: "",
	},
	items: [
		{
			name: "Item#1",
			quantity: "4",
			price: "5.25",
			unit_amount: {
				currency_code: "EUR",
				value: "5.25",
			},
		},
		{
			name: "Item#2",
			quantity: "1",
			price: "2.25",
			unit_amount: {
				currency_code: "EUR",
				value: "2.25",
			},
		},
	],
});
console.log(invoice);
```

## Delete Invoice:

```js
const InvoiceHandler = require("paypal-invoices");

await InvoiceHandler.deleteInvoice("invoiceID", "clientID", "secret");
```

## Get API Token:

```js
const InvoiceHandler = require("paypal-invoices");

var apitoken = await InvoiceHandler.getPayPalToken("clientID", "secret");
```

## Get Invoice Info:

```js
const InvoiceHandler = require("paypal-invoices");

var invoiceInfo = await InvoiceHandler.getInvoiceInfo("invoiceID", "clientID", "secret");
console.log(invoiceInfo);
```

## Generate QR Code for the Invoice:

```js
const InvoiceHandler = require("paypal-invoices");

await InvoiceHandler.generateQRCode("invoiceID", "clientID", "secret");
```

## Feedback

If you have any feedback, please reach out to me at mail@conner-bachmann.de
