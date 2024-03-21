import { json, type RequestHandler } from '@sveltejs/kit';
import { env as privEnv } from '$env/dynamic/private';
import type { CreateSubscriptionRequestBody } from '$lib/types/types/subscription.types';

/** @type {import('./$types').RequestHandler} */
export const POST = (async ({ request, locals }) => {
	console.log('clicked');

	const createRequestBody = (await request.json()) as CreateSubscriptionRequestBody;
	console.log('req bod', createRequestBody);
	const createSubscription = await locals.credentialServiceBillingApi.createSubscription(
		createRequestBody,
		{
			headers: { 'id-token': request.headers.get('id-token') || '' }
		}
	);

	if (!createSubscription.success) {
		return json(createSubscription, { status: createSubscription.status });
	}

	return json(createSubscription.data, { status: createSubscription.status });
}) satisfies RequestHandler;
