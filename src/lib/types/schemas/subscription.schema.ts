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
	quantity: z.number()
});

export const GetSubscriptionResponseSchema = z.object({
	subscription: z.object({
		data: z.array(SubscriptionSchema)
	})
});

export const CreateSubscriptionRequestBodySchema = z.object({
	price: z.string(),
	successURL: z.string(),
	cancelURL: z.string(),
	idempotencyKey: z.string().optional()
});

export const UpdateSubscriptionRequestBodySchema = z.object({
	returnUrl: z.string()
});

const StripeSubscriptionResponseSchema = z.object({
	clientSecret: z.string()
});

export const UpdateSubscriptionResponseSchema = StripeSubscriptionResponseSchema;

export const CreateSubscriptionResponseSchema = StripeSubscriptionResponseSchema;
