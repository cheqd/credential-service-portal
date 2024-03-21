import { redirect } from '@sveltejs/kit';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { LogtoAuthHandler } from '@cntr/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { env as privEnv } from '$env/dynamic/private';
import { CredentialServiceBillingSever } from '$lib/api/credentialServiceBilling';

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
			break;
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
		const idToken = await event.locals.logto.getIdToken();
		console.log('user', user);
		console.log('idToken', idToken);
		event.locals.user = user;
		event.locals.idToken = idToken;
	} catch (err) {
		event.locals.user = null;
		event.locals.idToken = null;
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

export const setupClient: Handle = async ({ event, resolve }) => {
	event.locals.credentialServiceBillingApi = new CredentialServiceBillingSever(
		privEnv.CREDENTIAL_SERVICE_ENDPOINT,
		event.fetch
	);
	if (event.locals.idToken) {
		console.log('id token exists', event.locals.idToken);
		await fetchStripeProducts(
			event.locals,
			event.locals.credentialServiceBillingApi,
			event.locals.idToken
		);
	}

	return await resolve(event);
};

export const fetchStripeProducts = async (
	locals: App.Locals,
	server: CredentialServiceBillingSever,
	idToken: string
) => {
	console.log('called');
	if (!locals.stripeProducts) {
		console.log('no stripe products');
		const products = await server.listProducts(true, {
			headers: {
				'id-token': idToken
			}
		});
		console.log('products fetched', products);
		if (products.success) {
			console.log('products fetched success', products.data);
			locals.stripeProducts = products.data;
		}
	}
};

export const handle = sequence(
	wrapLogtoAuthHandler(),
	setLogtoAuthenticatedUser,
	authenticationHandler,
	setupClient
);
