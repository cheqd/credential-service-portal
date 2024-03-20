import { z } from 'zod';

import type {
	GetSubscriptionResponseSchema,
	SubscriptionPlanSchema,
	SubscriptionSchema
} from '../schemas/subscription.schema';

export type GetSubscriptionResponse = z.infer<typeof GetSubscriptionResponseSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
