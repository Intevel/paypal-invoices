const PayPalInvoices = require("./src");
const config = require("./config.json")


async function init() {
	const token = await PayPalInvoices.getToken(config.clientID, config.secretID);
	//PayPalInvoices.createInvoice(token, "test@thatsfordevelopment.at", "test", "5", "1")
	PayPalInvoices.createInvoiceQRCode(token, "INV2-SQWP-6UB6-8JEM-EXF9")
}
//https: //www.sandbox.paypal.com/invoice/p/#INV2UDXGSFY2Q46RAVXL
init();