import type { CredentialServiceApiResponse, GenericErrorResponse } from './helpers';
import { env } from '$env/dynamic/private';
import type { GetProductsListResponse } from '$lib/types/types/product.types';
import { GetProductsListResponseSchema } from '$lib/types/schemas/product.schema';
import type { GetSubscriptionsResponse } from '$lib/types/types/subscription.types';
import { GetSubscriptionsResponseSchema } from '$lib/types/schemas/subscription.schema';
import { jwtDecode } from 'jwt-decode';


export type AuthenticationTokenResponse = {
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
};

export class CredentialServiceBillingSever {
	private readonly apiEndpoint: string;
	private readonly fetch: typeof fetch;
	private _m2mToken: string = '';

	private async getHeaders(): Promise<Record<string, string>> {
		const m2mToken = this._m2mToken && await this.isM2MNotExpired()
		? this._m2mToken
		: await this.issueM2MToken();
		return {
			'Authorization': `Bearer ${m2mToken}`
		};
	
	}

	private async isM2MNotExpired(): Promise<boolean> {
		const expiredAt = jwtDecode(this._m2mToken) as { exp: number };
		return expiredAt.exp < Date.now();
	}

	// this method uses the Management API. It's scope is well beyond the user scope.
	private issueM2MToken = async (): Promise<string> => {
		const searchParams = new URLSearchParams({
			grant_type: 'client_credentials',
			resource: env.LOGTO_MANAGEMENT_API,
			scope: 'all',
		});

		const uri = new URL('/oidc/token', env.LOGTO_ENDPOINT);
		const token = `Basic ${btoa(env.LOGTO_M2M_APP_ID + ':' + env.LOGTO_M2M_APP_SECRET)}`;

		// we use global fetch here, SvelteKit fetch throws CORS error
		const response = await fetch(uri, {
			method: 'POST',
			body: searchParams,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: token,
			},
		});
		const data = await response.json();
		if (response.status === 200) {
			const authResponse = data as AuthenticationTokenResponse;
			this._m2mToken = authResponse.access_token;
			console.log('M2M token issued', authResponse);
			return authResponse.access_token;
		}

		throw new Error('Failed to issue M2M token');
	};

	constructor(endpoint: string, fetcher: typeof fetch) {
		this.apiEndpoint = endpoint;
		this.fetch = fetcher;
	}

	async listProducts(
		prices: boolean = false,
		initOptions?: RequestInit
	): Promise<CredentialServiceApiResponse<GetProductsListResponse, GenericErrorResponse>> {
		const uri = new URL(`/admin/products/list?prices=${prices}`, this.apiEndpoint);

		const response = await this.fetch(uri, {
			...initOptions,
			headers: {
				...initOptions?.headers,
				...await this.getHeaders()
			}
		});

		const data = await response.json();
		if (response.status !== 200) {
			return {
				...(data as GenericErrorResponse),
				success: false,
				status: response.status
			};
		}

		const parsed = GetProductsListResponseSchema.safeParse(data);
		if (!parsed.success) {
			return {
				success: false,
				status: 406,
				error: parsed.error.toString()
			};
		}

		return {
			success: true,
			data: parsed.data,
			status: response.status
		};
	}

	async listSubscription(
		initOptions?: RequestInit
	): Promise<CredentialServiceApiResponse<GetSubscriptionsResponse, GenericErrorResponse>> {
		const uri = new URL(`/admin/subscription/list`, this.apiEndpoint);

		const response = await this.fetch(uri, {
			...initOptions,
			headers: {
				...initOptions?.headers,
				...await this.getHeaders()
			}
		});

		const data = await response.json();
		if (response.status !== 200) {
			return {
				...(data as GenericErrorResponse),
				success: false,
				status: response.status
			};
		}

		const parsed = GetSubscriptionsResponseSchema.safeParse(data);
		if (!parsed.success) {
			return {
				success: false,
				status: 406,
				error: parsed.error.toString()
			};
		}

		return {
			success: true,
			data: parsed.data,
			status: response.status
		};
	}
}
