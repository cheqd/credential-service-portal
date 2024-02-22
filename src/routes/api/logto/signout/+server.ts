import { isSvelteKitRedirect } from '$lib/helpers';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE = (async ({ url, locals }) => {
	try {
		await locals.logto.signOut(url.origin);
		return new Response(null, { status: 204 });
	} catch (err) {
		if (isSvelteKitRedirect(err)) {
			return json({ location: err.location }, { status: 201, headers: { Location: err.location } });
		}

		console.error('SignOut API Error: ', err);
		return json({ error: (err as Error).message }, { status: 400 });
	}
}) satisfies RequestHandler;
