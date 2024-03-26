import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import type { LogtoApiError, LogtoRoleScopesList } from '$lib/types/types/logto.types';
import {
	parseCaaSUserLogtoRole,
	type CredentialServiceApiResponse,
	LogtoRolesMap
} from '$lib/api/helpers';
import { LogtoRoleScopesListSchema } from '$lib/types/schemas/logto.schema';

export const GET: RequestHandler = async ({ locals, url, fetch }) => {
	const authToken = locals.logto.authTokenResponse;
	let resp: CredentialServiceApiResponse<LogtoRoleScopesList, LogtoApiError>;
	console.log('auth token', authToken);
	if (!authToken) {
		console.log('faling at logto/scope');
		resp = {
			success: false,
			status: 401,
			error: 'logto: getRole: missing authentication token',
			error_description: ''
		};
		return json(resp, { status: 401 });
	}

	try {
		console.log('search params', url.searchParams.get('roleId'));
		const roleId = parseCaaSUserLogtoRole(url.searchParams.get('roleId') ?? '');
		console.log('role id', roleId);
		const uri = new URL(`/api/roles/${LogtoRolesMap.get(roleId)}/scopes`, env.LOGTO_ENDPOINT);
		const response = await fetch(uri, {
			headers: {
				Authorization: `Bearer ${authToken.access_token}`
			}
		});

		console.log('/api/roles/roleId/scopes: response ', response.status);
		const data = await response.json();

		if (response.status === 200) {
			const scopes = LogtoRoleScopesListSchema.parse(data);
			resp = {
				success: true,
				data: scopes,
				status: 200
			};
			return json(resp, { status: 200 });
		}

		resp = {
			...(data as LogtoApiError),
			success: false,
			status: response.status
		};
		return json(resp, { status: response.status });
	} catch (err) {
		resp = {
			error_description: (err as Error).name,
			error: (err as Error).message,
			success: false,
			status: 500
		};
		return json(resp, { status: 500 });
	}
};
