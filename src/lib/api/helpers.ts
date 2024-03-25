import { env } from '$env/dynamic/private';
import { z } from 'zod';

export type CredentialServiceApiError<Error> = Error & {
	success: false;
	status: number;
};
export type CredentialServiceApiSuccessResponse<T> = {
	success: true;
	status: number;
	data: T;
};
export type CredentialServiceApiResponse<Success, Error> =
	| CredentialServiceApiSuccessResponse<Success>
	| CredentialServiceApiError<Error>;

export type GenericErrorResponse = z.infer<typeof GenericErrorResponseSchema>;

export const GenericErrorResponseSchema = z.object({
	error: z.string(),
	errors: z.record(z.string(), z.string()).optional()
});

export const parseCaaSUserLogtoRole = (input: string) => {
	switch (input) {
		case 'PortalOwner':
			return CaaSUserLogtoRole.PortalOwner;
		default:
			throw new Error('Invalid input, allowed values are: PortalOwner');
	}
};

export enum CaaSUserLogtoRole {
	PortalOwner = 'PortalOwner'
}

export const LogtoRolesMap = new Map<CaaSUserLogtoRole, string>([
	[CaaSUserLogtoRole.PortalOwner, env.LOGTO_CAAS_USER_PORTAL_OWNER_ROLE_ID]
]);

export type UpdateUserOnboardingRequest = {
	id: string;
	role: string;
};

export const isAuthorized = (locals: App.Locals, mainnetRole: string, testnetRole: string) => {
	if (!locals?.rbac || !locals.rbac.scopes) {
		return false;
	}

	const scopeName = env.PUBLIC_NODE_ENV === 'production' ? mainnetRole : testnetRole;

	return locals.rbac.scopes.some((scope) => scope.name === scopeName);
};
