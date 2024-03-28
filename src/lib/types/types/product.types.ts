import { z } from 'zod';
import type {
	GetProductsListResponseSchema,
	ProductFeatureSchema,
	ProductSchema
} from '../schemas/product.schema';

export type GetProductsListResponse = z.infer<typeof GetProductsListResponseSchema>;
export type ProductFeature = z.infer<typeof ProductFeatureSchema>;
export type Product = z.infer<typeof ProductSchema>;
