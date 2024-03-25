import { z } from 'zod';
import type { LogtoRoleScopesListSchema, LogtoUserRolesListSchema } from '../schemas/logto.schema';
import type { APIError } from './common.schema';

export type AuthenticationTokenResponse = {
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
};

export type LogtoRoleScopesList = z.infer<typeof LogtoRoleScopesListSchema>;
export type LogtoUserRolesList = z.infer<typeof LogtoUserRolesListSchema>;

export type LogtoApiError = {
	error: string;
	error_description: string;
};

export type LogtoUserRolesResponse = APIError & {
	roles: LogtoUserRolesList;
};
