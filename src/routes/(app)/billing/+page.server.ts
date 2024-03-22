import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
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
					idToken,
					subscriptionNotFound: false
				};
			} else if (subscription.status === 404) {
				return {
					subscriptionNotFound: true,
					idToken
				};
			}
		}

		return { subscription: null, subscriptionNotFound: false, idToken };
	} catch (error) {
		console.error('Error occurred while loading page:', error);
		return { subscription: null, subscriptionNotFound: false };
	}
};
