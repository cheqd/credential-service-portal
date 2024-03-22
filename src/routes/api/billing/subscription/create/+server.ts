import { json, type RequestHandler } from '@sveltejs/kit';
import type { CreateSubscriptionRequestBody } from '$lib/types/types/subscription.types';

export const POST: RequestHandler = async ({ request, locals }) => {
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
