import { z } from 'zod';
import { PriceSchema } from './price.schema';

export const ProductFeatureSchema = z.object({
	name: z.string()
});

export const ProductSchema = z.object({
	id: z.string(),
	object: z.enum(['product']), // this might be constant, have a look again
	active: z.boolean(),
	attributes: z.array(z.any()), // TODO: check this again
	description: z.string(),
	features: z.array(ProductFeatureSchema),
	name: z.string(),

	prices: z.array(PriceSchema)
});

export const GetProductsListResponseSchema = z.object({
	products: z.object({ data: z.array(ProductSchema) })
});
