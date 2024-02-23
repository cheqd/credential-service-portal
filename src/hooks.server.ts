import { redirect } from '@sveltejs/kit';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { LogtoAuthHandler } from '@cntr/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { env as privEnv } from '$env/dynamic/private';

const authenticationHandler: Handle = async ({ event, resolve }) => {
	const logtoAuth = await event.locals.logto.isAuthenticated();
	const authenticated = logtoAuth && event.locals.user;
	const pathname = event.url.pathname;
	switch (pathname) {
		case '/home':
		case '/billing':
			if (!authenticated) {
				throw redirect(303, '/');
			}
			break;
		case '/':
		case '/logto/callback':
			if (authenticated) {
				throw redirect(301, '/home');
			}
			break;
	}
	return await resolve(event);
};

export const logtoCallbackHander = async (event: RequestEvent) => {
	if (event.locals.callbackErr) {
		console.error('error in handleSignInCallback: ', event.locals.callbackErr);
		throw redirect(303, '/');
	}
};

const setLogtoAuthenticatedUser: Handle = async ({ event, resolve }) => {
	try {
		const user = await event.locals.logto.fetchUserInfo();
		event.locals.user = user;
	} catch (err) {
		event.locals.user = null;
	}

	return await resolve(event);
};

const wrapLogtoAuthHandler = () => {
	return LogtoAuthHandler(
		privEnv.LOGTO_APP_ID,
		privEnv.LOGTO_ENDPOINT,
		[],
		[],
		'/logto/callback',
		logtoCallbackHander
	);
};

export const handle = sequence(
	wrapLogtoAuthHandler(),
	setLogtoAuthenticatedUser,
	authenticationHandler
);
