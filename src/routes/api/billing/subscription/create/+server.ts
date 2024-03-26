import { json, type RequestHandler } from '@sveltejs/kit';
import type { CreateSubscriptionRequestBody } from '$lib/types/types/subscription.types';
import { isAuthorized } from '$lib/api/helpers';

export const POST: RequestHandler = async ({ request, locals }) => {
	console.log('locals role at create sub', locals.rbac);
	if (
		!isAuthorized(locals, 'admin:subscription:create:mainnet', 'admin:subscription:create:testnet')
	) {
		return json({ error: 'User is not authorized to create subscription ' }, { status: 403 });
	}

	try {
		const requestBody = (await request.json()) as CreateSubscriptionRequestBody;

		const idToken = request.headers.get('id-token') || '';

		const createSubscription = await locals.credentialServiceBillingApi.createSubscription(
			requestBody,
			{
				headers: { 'id-token': idToken }
			}
		);

		if (!createSubscription.success) {
			return json(createSubscription, { status: createSubscription.status });
		}
		return json(createSubscription.data, { status: createSubscription.status });
	} catch (error) {
		console.error('Error occurred:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
