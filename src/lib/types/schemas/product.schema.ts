import { z } from 'zod';
import { PriceSchema } from './price.schema';

export const ProductFeatureSchema = z.object({
	name: z.string()
});

export const ProductSchema = z.object({
	id: z.string(),
	active: z.boolean(),
	description: z.string(),
	features: z.array(ProductFeatureSchema),
	name: z.string(),
	prices: z.array(PriceSchema)
});

export const GetProductsListResponseSchema = z.object({
	products: z.object({ data: z.array(ProductSchema) })
});
