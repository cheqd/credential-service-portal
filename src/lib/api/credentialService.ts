import type { CredentialServiceApiResponse, GenericErrorResponse } from './helpers';
import { env } from '$env/dynamic/private';
import type { GetProductsListResponse } from '$lib/types/types/product.types';
import { GetProductsListResponseSchema } from '$lib/types/schemas/product.schema';
import type { GetSubscriptionsResponse } from '$lib/types/types/subscription.types';
import { GetSubscriptionsResponseSchema } from '$lib/types/schemas/subscription.schema';

export class CredentialServiceBillingSever {
	private readonly apiEndpoint: string;
	private readonly fetch: typeof fetch;
	protected readonly headers = {
		Authorization: `Bearer ${env.LOGTO_M2M_TOKEN}`
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
				...this.headers
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
				...this.headers
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
