import * as fetch from "node-fetch";
import * as fs from "fs";

export type InvoiceItem = {
	name: string;
	quantity: number;
	price: string;
	unit_amount: {
		currency_code: string;
		value: string;
	};
};

export type Invoicer = {
	businessName: string;
	invoicerEmailAdress: string;
	website?: string;
	logoUrl: string;
	additionalNotes?: string;
};

export type InvoiceOptions = {
	clientID: string;
	secretID: string;
	receiver: string;
	tax_id: string;
	details: {
		currency_code: string;
		termsAndConditions?: string;
	};
	tax_name: string;
	tax_percent: string;
	tax_calculated_after_discount: Boolean;
	tax_inclusive: Boolean;
	invoicer: Invoicer;
	items: [InvoiceItem];
};

export async function getPayPalToken(clientID: string, secretID: string) {
	const params = new URLSearchParams();
	params.append("grant_type", "client_credentials");
	const res = await fetch("https://api.sandbox.paypal.com/v1/oauth2/token", {
		method: "POST",
		body: params,
		headers: {
			Authorization: "Basic " + Buffer.from(`${clientID}:${secretID}`).toString("base64"),
		},
	});
	const data = await res.json();
	if (!res) throw new Error(`No Response`);
	if (!res.ok) throw new Error(`Error: ${res.statusText}`);
	if (!data.access_token) throw new Error(`Error: ${res.statusText}`);
	return data.access_token;
}

export async function createInvoice(options: InvoiceOptions) {
	var token = await getPayPalToken(options.clientID, options.secretID);
	const res = await fetch("https://api.sandbox.paypal.com/v2/invoicing/invoices", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify({
			invoicer: {
				...options.invoicer,
			},
			detail: {
				...options.details,
			},
			tax: {
				id: options.tax_id,
				name: options.tax_name,
				percent: options.tax_percent,
			},
			items: options.items,
			primary_recipients: [
				{
					billing_info: {
						email_address: options.receiver,
					},
				},
			],
		}),
	});
	const data = await res.json();
	console.log(data);
	const invoiceURL = data.href;
	if (!res.ok) throw `Error: ${res.statusText}`;
	const invoiceData = await fetch(invoiceURL, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
	const invoiceDataJSON = await invoiceData.json();
	return invoiceDataJSON.id;
}

export async function getInvoiceInfo(invoiceID: string, clientID: string, secretID: string) {
	const res = await fetch(`https://api.sandbox.paypal.com/v2/invoicing/invoices/${invoiceID}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + (await getPayPalToken(clientID, secretID)),
		},
	});
	const data = await res.json();
	if (!res.ok) throw `Error: ${res.statusText}`;
	console.log(data);
	return data;
}

export async function deleteInvoice(invoiceID: string, clientID: string, secretID: string) {
	const res = await fetch(`https://api.sandbox.paypal.com/v2/invoicing/invoices/${invoiceID}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + (await getPayPalToken(clientID, secretID)),
		},
	});
	const data = await res.json();
	//console.log(data)
	if (!res.ok) throw `Error: ${res.statusText}`;
	return data;
}

export async function generateQRCode(invoiceID: string, clientID: string, secretID: string) {
	const res = await fetch(`https://api.sandbox.paypal.com/v2/invoicing/invoices/${invoiceID}/generate-qr-code`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + (await getPayPalToken(clientID, secretID)),
		},
	});
	const data = await res.text();

	//console.log(data)

	if (!res.ok) throw `Error: ${res.statusText}`;
	let t = "",
		i = [];
	//@ts-ignore
	for (let n = 0; n < data.length; n++) "\n" === data[n] ? ((t = t.replace("\r", "")) && i.push(t), (t = "")) : (t += data[n]);
	i.splice(0, 3);
	let o = i[0];
	console.log(data);
	console.log(o);
	let c = Buffer.from(o, "base64");
	fs.writeFileSync("../images/" + invoiceID + ".png", c, {
		encoding: "binary",
	});
	return data;
}
