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
