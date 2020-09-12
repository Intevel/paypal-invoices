const PayPalInvoices = require("../src");
const config = require("../config/config.json")


async function init() {

	const token = await PayPalInvoices.getToken(config.clientID, config.secretID);
	// -> returns token

	PayPalInvoices.createInvoice(token, "test@thatsfordevelopment.at", "test", "5", "1")
	// -> {
	// ->  rel: 'self',
	// ->  href: 'https://api.sandbox.paypal.com/v2/invoicing/invoices/INV2-W8VG-4SY5-BTJ2-6HM6',
	// ->  method: 'GET'
	// -> }
}
init();