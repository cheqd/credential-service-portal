import { z } from 'zod';

import type {
	CreateSubscriptionRequestBodySchema,
	CreateSubscriptionResponseSchema,
	GetSubscriptionResponseSchema,
	SubscriptionPlanSchema,
	SubscriptionSchema,
	UpdateSubscriptionRequestBodySchema,
	UpdateSubscriptionResponseSchema
} from '../schemas/subscription.schema';

export type GetSubscriptionResponse = z.infer<typeof GetSubscriptionResponseSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
export type CreateSubscriptionRequestBody = z.infer<typeof CreateSubscriptionRequestBodySchema>;
export type UpdateSubscriptionRequestBody = z.infer<typeof UpdateSubscriptionRequestBodySchema>;
export type UpdateSubscriptionResponse = z.infer<typeof UpdateSubscriptionResponseSchema>;
export type CreateSubscriptionResponse = z.infer<typeof CreateSubscriptionResponseSchema>;
