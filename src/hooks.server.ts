import { redirect } from '@sveltejs/kit';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { LogtoAuthHandler } from '@cntr/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

const authenticationHandler: Handle = async ({ event, resolve }) => {
	const { locals } = event;
	let authenticated = false;

	const pathname = event.url.pathname;
	try {
		authenticated = await locals.logto.isAuthenticated();
		locals.user = await locals.logto.fetchUserInfo();
	} catch (err) {
		takeUserToLanding(pathname, true);
		return await resolve(event);
	}

	await handlePageRouting(event, authenticated);
	return await resolve(event);
};

export const logtoCallbackHander = async (event: RequestEvent) => {
	if (event.locals.callbackErr) {
		console.error('error in handleSignInCallback: ', event.locals.callbackErr);
		throw redirect(303, '/');
	}
};

const wrapLogtoAuthHandler = () => {
	return LogtoAuthHandler(
		privEnv.LOGTO_APP_ID,
		privEnv.LOGTO_ENDPOINT,
		undefined,
		undefined,
		'/logto/callback',
		logtoCallbackHander
	);
};

export const handle = sequence(wrapLogtoAuthHandler(), authenticationHandler);
