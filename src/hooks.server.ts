import { redirect } from '@sveltejs/kit';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { LogtoAuthHandler } from '@cntr/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { env as privEnv } from '$env/dynamic/private';

const authenticationHandler: Handle = async ({ event, resolve }) => {
	const { locals } = event;
	console.log('locals', locals);
	let authenticated = false;

	const pathname = event.url.pathname;
	try {
		authenticated = await locals.logto.isAuthenticated();
		console.log('authenticted', authenticated);
		locals.user = await locals.logto.fetchUserInfo();
		console.log('current user', locals.user);
	} catch (err) {
		console.log('error in auth handler ', err);

		return await resolve(event);
	}
	console.log('authenticated', authenticated);

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
		[],
		[],
		'/logto/callback',
		logtoCallbackHander
	);
};

export const handle = sequence(wrapLogtoAuthHandler(), authenticationHandler);
