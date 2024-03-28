import { z } from 'zod';

export const PriceSchema = z.object({
	id: z.string(),
	unit_amount: z.number(),
	currency: z.string().regex(/^[A-Za-z]{3}$/)
});
