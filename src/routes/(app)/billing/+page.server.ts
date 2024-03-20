import type { Subscription } from '$lib/types/types/subscription.types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const idToken = await locals.idToken;
	if (idToken) {
		const products = await locals.credentialServiceBillingApi.listProducts(true, {
			headers: {
				'id-token': idToken
			}
		});
		const subscription = await locals.credentialServiceBillingApi.getCurrentSubscription({
			headers: {
				'id-token': idToken
			}
		});

		if (products.success && subscription.success) {
			return {
				products: products.data.products.data,
				subscription: subscription.data.subscription,
				idToken
			};
		}
	}

	return { products: [], subscriptions: [] };
};
