import { z } from 'zod';

export const SubscriptionPlanSchema = z.object({
	id: z.string(),
	amount: z.number(),
	amount_decimal: z.string(),
	created: z.number(),
	currency: z.string(),
	product: z.string()
});

export const SubscriptionSchema = z.object({
	id: z.string(),
	currency: z.string(),
	customer: z.string(),
	plan: SubscriptionPlanSchema,
	quantity: z.number(),
	trial_end: z.number().optional()
});

export const GetSubscriptionResponseSchema = z.object({
	subscription: SubscriptionSchema
});

export const CreateSubscriptionRequestBodySchema = z.object({
	price: z.string(),
	successURL: z.string(),
	cancelURL: z.string(),
	idempotencyKey: z.string().optional(),
	trialPeriodDays: z.number().optional()
});

export const UpdateSubscriptionRequestBodySchema = z.object({
	returnURL: z.string()
});

const StripeSubscriptionResponseSchema = z.object({
	sessionURL: z.string()
});

export const UpdateSubscriptionResponseSchema = StripeSubscriptionResponseSchema;

export const CreateSubscriptionResponseSchema = StripeSubscriptionResponseSchema;
