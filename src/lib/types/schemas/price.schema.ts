import { z } from 'zod';

export const PriceSchema = z.object({
	id: z.string(),
	object: z.enum(['price']), // have another look again
	type: z.string(),
	unit_amount: z.number(),
	unit_amount_decimal: z.string()
});
