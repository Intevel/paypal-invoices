const PayPalInvoices = require("../src");
const config = require("../config/config.json")


async function init() {

	const token = await PayPalInvoices.getToken(config.clientID, config.secretID);
	PayPalInvoices.createInvoiceQRCode(token, "INV2-SQWP-2222-444F-EXF9")
}
init();