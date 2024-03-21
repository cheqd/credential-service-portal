import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const idToken = await locals.idToken;

	// had try catch blocks
	if (idToken) {
		const subscription = await locals.credentialServiceBillingApi.getCurrentSubscription({
			headers: {
				'id-token': idToken
			}
		});

		if (subscription.status === 404) {
			// User doesn't have any subscription yet
			return {
				subscriptionNotFound: true
			};
		}
		if (subscription.success) {
			return {
				subscription: subscription.data.subscription,
				idToken,
				subscriptionNotFound: false
			};
		}
	}

	return { subscription: [], subscriptionNotFound: false };
};
