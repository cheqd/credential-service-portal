import { env } from '$env/dynamic/public';

import type {
	CreateSubscriptionRequestBody,
	CreateSubscriptionResponse,
	UpdateSubscriptionRequestBody,
	UpdateSubscriptionResponse
} from '$lib/types/types/subscription.types';

import type { CredentialServiceApiResponse, GenericErrorResponse } from './helpers';

export async function createSubscription(
	priceId: string,
	idToken: string | null
): Promise<CredentialServiceApiResponse<CreateSubscriptionResponse, GenericErrorResponse>> {
	try {
		const requestBody = {
			price: priceId,
			successURL: env.PUBLIC_STRIPE_CREATE_SUBSCRIPTION_SUCCESS_URL,
			cancelURL: env.PUBLIC_STRIPE_CREATE_SUBSCRIPTION_CANCEL_URL,
			trialPeriodDays: 14
		} satisfies CreateSubscriptionRequestBody;

		const response = await fetch('/api/billing/subscription/create', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'id-token': idToken || ''
			}
		});

		if (response.status !== 200) {
			return {
				error: await response.text(),
				success: false,
				status: response.status
			};
		}

		const data = (await response.json()) as CreateSubscriptionResponse;
		return {
			data: data,
			success: true,
			status: response.status
		};
	} catch (e) {
		return {
			success: false,
			error: (e as Error).message,
			status: 500
		};
	}
}

export async function updateSubscription(
	idToken: string | null
): Promise<CredentialServiceApiResponse<UpdateSubscriptionResponse, GenericErrorResponse>> {
	try {
		const requestBody = {
			returnUrl: env.PUBLIC_STRIPE_UPDATE_SUBSCRIPTION_RETURN_URL
		} satisfies UpdateSubscriptionRequestBody;

		const response = await fetch('/api/billing/subscription/update', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'id-token': idToken || ''
			}
		});

		if (response.status !== 200) {
			return {
				error: await response.text(),
				success: false,
				status: response.status
			};
		}

		const data = (await response.json()) as UpdateSubscriptionResponse;
		return {
			data: data,
			success: true,
			status: response.status
		};
	} catch (e) {
		return {
			error: (e as Error).message,
			success: false,
			status: 500
		};
	}
}
