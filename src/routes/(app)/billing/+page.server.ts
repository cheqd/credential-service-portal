import type { Subscription } from '$lib/types/types/subscription.types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const idToken = await locals.idToken;
		const { credentialServiceBillingApi } = locals;

		if (idToken) {
			const subscription = await credentialServiceBillingApi.getCurrentSubscription({
				headers: {
					'id-token': idToken
				}
			});

			const subscriptionData: {
				subscription: Subscription | null;
				subscriptionNotFound: boolean;
				idToken: string;
				errorWhenGettingSubscription: boolean;
			} = {
				subscription: null,
				subscriptionNotFound: false,
				idToken,
				errorWhenGettingSubscription: false
			};

			if (subscription.success) {
				subscriptionData.subscription = subscription.data.subscription;
			} else if (subscription.status === 404) {
				subscriptionData.subscriptionNotFound = true;
			} else {
				subscriptionData.errorWhenGettingSubscription = true;
			}

			return subscriptionData;
		}

		return {
			subscription: null,
			subscriptionNotFound: false,
			idToken,
			errorWhenGettingSubscription: true
		};
	} catch (error) {
		console.error('Error occurred while loading page:', error);
		return {
			subscription: null,
			subscriptionNotFound: false,
			idToken: null,
			errorWhenGettingSubscription: true
		};
	}
};
