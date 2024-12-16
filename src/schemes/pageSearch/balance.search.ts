import { z } from 'zod';

export const balancePageFiltersSchema = z.object({
  categoryId: z.string().nullish(),
  fromDate: z.string().or(z.date())
    .transform(val => !val ? null : val instanceof Date ? val : new Date(val))
    .pipe(z.date().nullish()).nullish(),
  toDate: z.string().or(z.date())
    .transform(val => !val ? null : val instanceof Date ? val : new Date(val))
    .pipe(z.date().nullish()).nullish(),
  isIncome: z.enum(['all', 'false', 'true']).default('all'),
})