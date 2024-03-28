import type { GetProductsListResponse } from '$lib/types/types/product.types';
import { writable } from 'svelte/store';

export const productsStore = writable<GetProductsListResponse | null>(null);
