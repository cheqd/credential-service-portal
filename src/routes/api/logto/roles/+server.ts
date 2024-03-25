import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { LogtoUserRolesListSchema } from '$lib/types/schemas/logto.schema';
import type { LogtoUserRolesResponse } from '$lib/types/types/logto.types';

export const GET: RequestHandler = async ({ locals, fetch }) => {
	const authToken = locals.logto.authTokenResponse;
	console.log('list roles response');
	if (!authToken) {
		console.log('failing at /logto/roles');
		return json(
			{ error: 'logto: getRole: missing authentication token', roles: [] },
			{ status: 401 }
		);
	}

	const userId = locals.user?.sub as string;

	try {
		const uri = new URL(`/api/users/${userId}/roles`, env.PUBLIC_LOGTO_ENDPOINT);
		const response = await fetch(uri, {
			headers: {
				Authorization: `Bearer ${authToken.access_token}`
			}
		});

		console.log('list roles response', response.status);
		if (response.status === 200) {
			const data = await response.json();
			const roles = LogtoUserRolesListSchema.safeParse(data);
			if (!roles.success) {
				return json(
					{ error: `Credential Service Portal User: logo: getRole: ${roles.error.toString()}` },
					{ status: 406 }
				);
			}
			return json({ roles: roles.data } as LogtoUserRolesResponse, { status: 200 });
		}

		return json(
			{
				error:
					'Credential Service Portal User: logo: getRole: User is missing required permissions',
				roles: []
			},
			{ status: 403 }
		);
	} catch (err) {
		return json({ error: (err as Error).message, roles: [] }, { status: 400 });
	}
};
