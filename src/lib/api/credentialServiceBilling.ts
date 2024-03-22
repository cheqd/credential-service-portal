import type { CredentialServiceApiResponse, GenericErrorResponse } from './helpers';
import { env } from '$env/dynamic/private';
import type { GetProductsListResponse } from '$lib/types/types/product.types';
import type {
	CreateSubscriptionRequestBody,
	CreateSubscriptionResponse,
	GetSubscriptionResponse,
	UpdateSubscriptionRequestBody,
	UpdateSubscriptionResponse
} from '$lib/types/types/subscription.types';
import { jwtDecode } from 'jwt-decode';

export type AuthenticationTokenResponse = {
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
};

export class CredentialServiceBillingServer {
	private readonly apiEndpoint: string;
	private readonly fetch: typeof fetch;
	private _m2mToken: string = '';

	private async getHeaders(): Promise<Record<string, string>> {
		const m2mToken = await this.getM2MToken();
		return {
			Authorization: `Bearer ${m2mToken}`,
			'Content-Type': 'application/json'
		};
	}

	private async getM2MToken(): Promise<string> {
		if (this._m2mToken && (await this.isM2MNotExpired())) {
			return this._m2mToken;
		}
		return this.issueM2MToken();
	}

	private async isM2MNotExpired(): Promise<boolean> {
		const expiredAt = jwtDecode(this._m2mToken) as { exp: number };
		return expiredAt.exp < Date.now();
	}

	private async issueM2MToken(): Promise<string> {
		const searchParams = new URLSearchParams({
			grant_type: 'client_credentials',
			resource: env.LOGTO_MANAGEMENT_API,
			scope: 'all'
		});

		const uri = new URL('/oidc/token', env.LOGTO_ENDPOINT);
		const token = `Basic ${btoa(env.LOGTO_M2M_APP_ID + ':' + env.LOGTO_M2M_APP_SECRET)}`;

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
			this._m2mToken = authResponse.access_token;
			console.log('M2M token issued', authResponse);
			return authResponse.access_token;
		}

		throw new Error('Failed to issue M2M token');
	}

	constructor(endpoint: string, fetcher: typeof fetch) {
		this.apiEndpoint = endpoint;
		this.fetch = fetcher;
	}

	private async handleApiResponse<T>(
		response: Response
	): Promise<CredentialServiceApiResponse<T, GenericErrorResponse>> {
		const data = await response.json();
		if (!response.ok) {
			return {
				...(data as GenericErrorResponse),
				success: false,
				status: response.status
			};
		}
		// TODO: schema validation when BE returns values needed by FE
		return {
			success: true,
			data: data as T,
			status: response.status
		};
	}

	async listProducts(
		prices: boolean = true,
		initOptions?: RequestInit
	): Promise<CredentialServiceApiResponse<GetProductsListResponse, GenericErrorResponse>> {
		try {
			const uri = new URL(`/admin/product/list?prices=${prices}`, this.apiEndpoint);
			const response = await this.fetch(uri, {
				...initOptions,
				headers: { ...(initOptions?.headers || {}), ...(await this.getHeaders()) }
			});
			return this.handleApiResponse<GetProductsListResponse>(response);
		} catch (error) {
			return { success: false, status: 500, error: (error as Error).message };
		}
	}

	async getCurrentSubscription(
		initOptions?: RequestInit
	): Promise<CredentialServiceApiResponse<GetSubscriptionResponse, GenericErrorResponse>> {
		try {
			const uri = new URL(`/admin/subscription/get`, this.apiEndpoint);
			const response = await this.fetch(uri, {
				...initOptions,
				headers: { ...(initOptions?.headers || {}), ...(await this.getHeaders()) }
			});
			return this.handleApiResponse<GetSubscriptionResponse>(response);
		} catch (error) {
			return { success: false, status: 500, error: (error as Error).message };
		}
	}

	async createSubscription(
		createSubscriptionBody: CreateSubscriptionRequestBody,
		initOptions?: RequestInit
	): Promise<CredentialServiceApiResponse<CreateSubscriptionResponse, GenericErrorResponse>> {
		try {
			const uri = new URL(`/admin/subscription/create`, this.apiEndpoint);
			const response = await this.fetch(uri, {
				...initOptions,
				method: 'POST',
				headers: { ...(initOptions?.headers || {}), ...(await this.getHeaders()) },
				body: JSON.stringify(createSubscriptionBody)
			});
			return this.handleApiResponse<CreateSubscriptionResponse>(response);
		} catch (error) {
			return { success: false, status: 500, error: (error as Error).message };
		}
	}

	async updateSubscription(
		updateSubscriptionBody: UpdateSubscriptionRequestBody,
		initOptions?: RequestInit
	): Promise<CredentialServiceApiResponse<UpdateSubscriptionResponse, GenericErrorResponse>> {
		try {
			const uri = new URL(`/admin/subscription/update`, this.apiEndpoint);
			const response = await this.fetch(uri, {
				...initOptions,
				method: 'POST',
				headers: { ...(initOptions?.headers || {}), ...(await this.getHeaders()) },
				body: JSON.stringify(updateSubscriptionBody)
			});
			return this.handleApiResponse<UpdateSubscriptionResponse>(response);
		} catch (error) {
			return { success: false, status: 500, error: (error as Error).message };
		}
	}
}
