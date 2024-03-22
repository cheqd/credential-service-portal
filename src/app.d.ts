// See https://kit.svelte.dev/docs/types#app

import type { CredentialServiceBillingServer } from '$lib/api/credentialServiceBilling';
import type { GetProductsListResponse } from '$lib/types/types/product.types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			logto: logtoClient;
			user: UserInfoResponse | null;
			idToken: string | null;
			callbackErr?: unknown;
			credentialServiceBillingApi: CredentialServiceBillingServer;
			stripeProducts: GetProductsListResponse | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

type logtoClient = LogtoClient & {
	authTokenResponse?: AuthenticationTokenResponse;
};

export {};
