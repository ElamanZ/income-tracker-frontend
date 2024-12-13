import dayjs from 'dayjs';
import { z } from 'zod';

export const transactionPageFiltersSchema = z.object({
  categoryId: z.string().nullish(),
  fromDate: z.string().or(z.date())
    .transform(val => !val ? null : val instanceof Date ? val : new Date(val))
    .pipe(z.date().nullish()).nullish()
    .default(dayjs().startOf('month').toDate()).optional(),
  toDate: z.string().or(z.date())
    .transform(val => !val ? null : val instanceof Date ? val : new Date(val))
    .pipe(z.date().nullish()).nullish()
    .default(dayjs().endOf('month').toDate()).optional(),
}).default({
  toDate: dayjs().endOf('month').toDate(),
  fromDate: dayjs().startOf('month').toDate(),
})