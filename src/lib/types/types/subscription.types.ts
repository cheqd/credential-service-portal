import { z } from 'zod';

import type {
	GetSubscriptionsResponseSchema,
	SubscriptionPlanSchema,
	SubscriptionSchema
} from '../schemas/subscription.schema';

export type GetSubscriptionsResponse = z.infer<typeof GetSubscriptionsResponseSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
