import { z } from 'zod';

export const LogtoApiResourceSchema = z.object({
	tenantId: z.string(),
	id: z.string(),
	name: z.string(),
	indicator: z.string(),
	isDefault: z.boolean().optional(),
	accessTokenTtl: z.number()
});
export const LogtoUserRoleSchema = z.object({
	tenantId: z.string(),
	id: z.string(),
	name: z.string(),
	description: z.string()
});

export const LogtoRoleScopeSchema = z
	.object({
		resourceId: z.string(),
		createdAt: z.number(),
		resource: LogtoApiResourceSchema
	})
	.extend(LogtoUserRoleSchema.shape);

export const LogtoUserRolesListSchema = z.array(LogtoUserRoleSchema);

export const LogtoRoleScopesListSchema = z.array(LogtoRoleScopeSchema);
