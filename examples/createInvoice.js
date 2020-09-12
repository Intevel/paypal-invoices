const PayPalInvoices = require("../src");
const config = require("../config/config.json")


async function init() {

	const token = await PayPalInvoices.getToken(config.clientID, config.secretID);
	PayPalInvoices.createInvoice(token, "test@thatsfordevelopment.at", "test", "5", "1")
}
init();