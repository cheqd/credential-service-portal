import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const idToken = await locals.idToken;
	if (idToken) {
		const subscription = await locals.credentialServiceBillingApi.getCurrentSubscription({
			headers: {
				'id-token': idToken
			}
		});

		if (subscription.success) {
			return {
				subscription: subscription.data.subscription,
				idToken
			};
		}
	}

	return { subscriptions: [] };
};
