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
	object: z.string(), // this is constant
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
