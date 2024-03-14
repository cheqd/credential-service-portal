// See https://kit.svelte.dev/docs/types#app

import type { CredentialServiceBillingSever } from '$lib/api/credentialService';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			logto: logtoClient;
			user: UserInfoResponse | null;
			idToken: string | null;
			callbackErr?: unknown;
			credentialServiceBillingApi: CredentialServiceBillingSever;
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
