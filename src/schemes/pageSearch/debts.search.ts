import { boolean, z } from 'zod';

export const debtsPageFiltersSchema = z.object({
  active: boolean().default(true),
  isMyDebt: z.boolean().default(true),
  fromDate: z.string().or(z.date())
    .transform(val => !val ? null : val instanceof Date ? val : new Date(val))
    .pipe(z.date().nullish()).nullish(),
  toDate: z.string().or(z.date())
    .transform(val => !val ? null : val instanceof Date ? val : new Date(val))
    .pipe(z.date().nullish()).nullish(),
  q: z.string().nullish(),
})