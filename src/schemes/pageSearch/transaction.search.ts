import { z } from 'zod';

export const transactionPageFiltersSchema = z.object({
  categories: z.string().nullish(),
  fromDate: z.string().or(z.date())
    .transform(val => !val ? null : val instanceof Date ? val : new Date(val))
    .pipe(z.date().nullish()).nullish(),
  toDate: z.string().or(z.date())
    .transform(val => !val ? null : val instanceof Date ? val : new Date(val))
    .pipe(z.date().nullish()).nullish(),
})