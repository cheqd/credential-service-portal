import { json, type RequestHandler } from '@sveltejs/kit';
import { isAuthorized } from '$lib/api/helpers';

export const GET: RequestHandler = async ({ request, locals }) => {
	console.log('locals.rback at products', locals.rbac);
	if (!isAuthorized(locals, 'admin:product:list:mainnet', 'admin:product:list:testnet')) {
		return json({ error: 'User is not authorized to list strip products' }, { status: 403 });
	}
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
