const config = require("./config/config.json");
const PayPalInvoices = require("./src");

async function init() {
	const token = await PayPalInvoices.getToken(config.clientID, config.secretID);
	PayPalInvoices.getInvoiceInfo(token, "INV2-SQWP-6UB6-8JEM-EXF9");
}
//https: //www.sandbox.paypal.com/invoice/p/#INV2UDXGSFY2Q46RAVXL
init();