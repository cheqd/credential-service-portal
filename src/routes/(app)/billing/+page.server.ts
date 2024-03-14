import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const idToken = await locals.idToken;
	if (idToken) {
		const products = await locals.credentialServiceBillingApi.listProducts(false, {
			headers: {
				'id-token': idToken
			}
		});
		const subscriptions = await locals.credentialServiceBillingApi.listSubscription({
			headers: {
				'id-token': idToken
			}
		});
		if (products.success && subscriptions.success) {
			return {
				products: products.data.products,
				subscriptions: subscriptions.data.subscriptions
			};
		}
	}

	return { products: [], subscriptions: [] };
};
