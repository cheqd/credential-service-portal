import { redirect } from '@sveltejs/kit';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { LogtoAuthHandler, UserScope } from '@cntr/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { env as privEnv } from '$env/dynamic/private';
import { CredentialServiceBillingServer } from '$lib/api/credentialServiceBilling';
import { CaaSUserLogtoRole, type CredentialServiceApiResponse } from '$lib/api/helpers';
import type {
	AuthenticationTokenResponse,
	LogtoApiError,
	LogtoRoleScopesList
} from '$lib/types/types/logto.types';

const authenticationHandler: Handle = async ({ event, resolve }) => {
	const logtoAuth = await event.locals.logto.isAuthenticated();
	const authenticated = logtoAuth;

	const pathname = event.url.pathname;
	switch (pathname) {
		case '/home':
		case '/billing':
			if (!authenticated) {
				throw redirect(303, '/');
			}
			break;
		case '/':
			if (authenticated) {
				throw redirect(301, '/home');
			}
			break;
		case '/logto/callback':
			if (authenticated) {
				throw redirect(301, '/home');
			}
			break;
	}
	return await resolve(event);
};

export const logtoCallbackHandler = async (event: RequestEvent) => {
	if (event.locals.callbackErr) {
		console.error('error in handleSignInCallback: ', event.locals.callbackErr);
		throw redirect(303, '/');
	}
};

const setLogtoAuthTokenForM2M: Handle = async ({ event, resolve }) => {
	const { url, locals } = event;

	if (url.pathname.startsWith('/api')) {
		try {
			const searchParams = new URLSearchParams({
				grant_type: 'client_credentials',
				resource: privEnv.LOGTO_MANAGEMENT_API,
				scope: 'all'
			});

			const uri = new URL('/oidc/token', privEnv.LOGTO_ENDPOINT);
			const token = `Basic ${btoa(privEnv.LOGTO_M2M_APP_ID + ':' + privEnv.LOGTO_M2M_APP_SECRET)}`;

			const response = await fetch(uri, {
				method: 'POST',
				body: searchParams,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: token
				}
			});

			if (response.ok) {
				const authResponse = await response.json();
				locals.logto.authTokenResponse = authResponse;
			} else {
				console.error('Failed to fetch M2M token:', response.status);
			}
		} catch (error) {
			console.error('Error occurred while fetching M2M token:', error);
		}
	}

	return await resolve(event);
};

const setLogtoAuthenticatedUser: Handle = async ({ event, resolve }) => {
	try {
		const user = await event.locals.logto.fetchUserInfo();
		const idToken = await event.locals.logto.getIdToken();
		event.locals.user = user;
		event.locals.idToken = idToken;
	} catch (err) {
		event.locals.user = null;
		event.locals.idToken = null;
	}

	return await resolve(event);
};

const wrapLogtoAuthHandler = () => {
	const scopes = [UserScope.Email, UserScope.Profile, UserScope.CustomData, UserScope.Identities];
	const resources = [privEnv.LOGTO_MANAGEMENT_API, privEnv.LOGTO_DEFAULT_RESOURCE_URL + '/admin'];

	return LogtoAuthHandler(
		privEnv.LOGTO_APP_ID,
		privEnv.LOGTO_ENDPOINT,
		scopes,
		resources,
		'/logto/callback',
		logtoCallbackHandler
	);
};

export const setupClient: Handle = async ({ event, resolve }) => {
	event.locals.credentialServiceBillingApi = new CredentialServiceBillingServer(
		privEnv.CREDENTIAL_SERVICE_ENDPOINT,
		event.fetch
	);

	return await resolve(event);
};

const setLogtoRBACScopes: Handle = async ({ event, resolve }) => {
	try {
		if (
			event.url.pathname === '/billing' ||
			(event.url.pathname.startsWith('/api') && event.url.pathname !== '/api/logto/scope')
		) {
			const response = await getLogtoRoleScopes(event.fetch);
			if (response.success) {
				event.locals.rbac = {
					scopes: response.data
				};
			}
		}
	} catch (error) {
		console.error('Error in setLogtoRBACScopes:', error);
	}

	return resolve(event);
};

const getLogtoRoleScopes = async (fetcher: typeof fetch) => {
	const response = await fetcher(`/api/logto/scope?roleId=${CaaSUserLogtoRole.PortalOwner}`);
	const data = (await response.json()) as CredentialServiceApiResponse<
		LogtoRoleScopesList,
		LogtoApiError
	>;
	return data;
};

export const handle = sequence(
	setupClient,
	wrapLogtoAuthHandler(),
	setLogtoAuthenticatedUser,
	setLogtoAuthTokenForM2M,
	setLogtoRBACScopes,
	authenticationHandler
);
