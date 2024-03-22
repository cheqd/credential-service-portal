import { json, type RequestHandler } from '@sveltejs/kit';
import type { UpdateSubscriptionRequestBody } from '$lib/types/types/subscription.types';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const updateRequestBody = (await request.json()) as UpdateSubscriptionRequestBody;

		const idToken = request.headers.get('id-token') || '';
		const updateSubscription = await locals.credentialServiceBillingApi.updateSubscription(
			updateRequestBody,
			{
				headers: { 'id-token': idToken }
			}
		);

		if (!updateSubscription.success) {
			return json(updateSubscription, { status: updateSubscription.status });
		}

		return json(updateSubscription.data, { status: updateSubscription.status });
	} catch (error) {
		console.error('Error occurred:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
