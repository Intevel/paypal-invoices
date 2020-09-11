const request = require("request");
const fetch = require("node-fetch");
const config = require("../config.json");

let APIToken = null;

class PayPalInvoices {

	/**
	 * @param {string} [clientID] - Client ID of PayPal API
	 * @param {string} [secretID] - Client Secret ID of PayPal API
	 */

	static async getToken(clientID, secretID) {
		let token = "";
		const params = new URLSearchParams();
		params.append("grant_type", "client_credentials");
		const res = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
			method: "POST",
			body: params,
			headers: {
				Authorization: "Basic " + Buffer.from(`${clientID}:${secretID}`).toString("base64")
			},
		});
		const data = await res.json();
		//console.log(data)
		if (!res.ok) throw `Error: ${res.statusText}`;
		token = data.access_token;
		console.log(token)
		return token;


	}

	/**
	 * @param {string} [apitoken] - Auth Token of PayPal API
	 * @param {string} [receiver] - Payment Receiver on Invoice
	 * @param {string} [item] - Item
	 * @param {string} [price] - Price for 1 Item 
	 * @param {string} [quantity] - Item Quantity
	 */

	static async createInvoice(apitoken, receiver, item, price, quantity) {
		const res = await fetch('https://api.sandbox.paypal.com/v2/invoicing/invoices', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + apitoken
			},
			body: JSON.stringify({
				invoicer: {
					business_name: config.invoicerInfo.businessName,
					...config.invoicerInfo.invoicerEmailAdress ? {
						email_address: config.invoicerInfo.invoicerEmailAdress
					} : {},
					website: config.invoicerInfo.website,
					logo_url: config.invoicerInfo.logoUrl,
					additional_notes: config.invoicerInfo.additionalNotes
				},
				detail: {
					note: config.invoiceDetails.note,
					terms_and_conditions: config.invoiceDetails.termsAndConditions,
					currency_code: config.invoiceDetails.currencyCode || "EUR"
				},
				tax: {
					id: config.tax.id,
					name: config.tax.name,
					percent: config.tax.percent
				},
				items: [{
					name: item,
					unit_amount: {
						currency_code: config.invoiceDetails.currencyCode || "EUR",
						value: price
					},
					quantity: quantity
				}],
				primary_recipients: [{
					billing_info: {
						email_address: receiver
					}
				}],
			})


		});
		const data = await res.json();
		console.log(data)
		const invoiceURL = data.href;
		if (!res.ok) throw `Error: ${res.statusText}`;
		const invoiceData = await fetch(invoiceURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + apitoken
			},


		});
		const invoiceDataJSON = await invoiceData.json();
		console.log(invoiceDataJSON.detail.metadata.recipient_view_url)

	}

	/**
	 * @param {string} [apiToken] - Auth Token of PayPal API
	 * @param {string} [invoiceID] - ID of Invoice
	 */

	static async createInvoiceQRCode(apiToken, invoiceID) {
		const res = await fetch(`https://api.sandbox.paypal.com/v2/invoicing/invoices/${invoiceID}/generate-qr-code`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + apiToken
			},
		});
		const data = await res.text()
		//console.log(data)
		if (!res.ok) throw `Error: ${res.statusText}`;
		console.log(data)
		return data;

	}

	/**
	 * @param {string} [apiToken] - Auth Token of PayPal API
	 * @param {string} [invoiceID] - ID of Invoice
	 */

	static async getInvoiceInfo(apiToken, invoiceID) {
		const res = await fetch(`https://api.sandbox.paypal.com/v2/invoicing/invoices/${invoiceID}/generate-qr-code`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + apiToken
			},
		});
		const data = await res.text()
		//console.log(data)
		if (!res.ok) throw `Error: ${res.statusText}`;
		console.log(data)
		return data;

	}

}

module.exports = PayPalInvoices;