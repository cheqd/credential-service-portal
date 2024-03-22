import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, locals }) => {
	try {
		const idToken = request.headers.get('id-token') || '';
		const getProducts = await locals.credentialServiceBillingApi.listProducts(true, {
			headers: { 'id-token': idToken }
		});

		if (!getProducts.success) {
			return json(getProducts, { status: getProducts.status });
		}
		return json(getProducts.data, { status: getProducts.status });
	} catch (error) {
		console.error('Error occurred:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
