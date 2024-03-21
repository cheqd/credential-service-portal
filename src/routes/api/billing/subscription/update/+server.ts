import { json, type RequestHandler } from '@sveltejs/kit';
import type { UpdateSubscriptionRequestBody } from '$lib/types/types/subscription.types';

/** @type {import('./$types').RequestHandler} */
export const POST = (async ({ request, locals }) => {
	console.log('clicked');

	const updateRequestBody = (await request.json()) as UpdateSubscriptionRequestBody;
	console.log('req bod', updateRequestBody);
	const updateSubscription = await locals.credentialServiceBillingApi.updateSubscription(
		updateRequestBody,
		{
			headers: { 'id-token': request.headers.get('id-token') || '' }
		}
	);

	if (!updateSubscription.success) {
		return json(updateSubscription, { status: updateSubscription.status });
	}

	return json(updateSubscription.data, { status: updateSubscription.status });
}) satisfies RequestHandler;
