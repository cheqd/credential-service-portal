import { z } from 'zod';
import type { APIErrorSchema } from '../schemas/common.schema';

export type APIError = z.infer<typeof APIErrorSchema>;
