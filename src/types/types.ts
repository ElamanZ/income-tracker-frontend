import { DocumentReference, Timestamp } from "firebase/firestore";
import { z } from "zod";


export type ProfileEntity = {
  id: string;
  avatarUrl: string | null;
  phone: string;
  updatedAt: string;
  createdAt: string;
  firstName?: string;
  lastName?: string;
  balance: number;
};

export type Category = {
  id: string;
  name: string;
  color: string;
  isIncome: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type GroupedCategories = {
  income: Category[];
  expense: Category[];
};


export const TransactionsSchema = z.object({
  id: z.string(),
  amount: z.number(),
  isIncome: z.boolean(),
  comment: z.string().nullable(),
  date: z.instanceof(Timestamp),
  categoryId: z.any().transform((val) => val ? val as DocumentReference : null),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
  userId: z.string(),
});

export type TransactionsSchema = z.infer<typeof TransactionsSchema>;

export type Transaction = {
  id: string;
  comment: string | null;
  isIncome: boolean;
  amount: number;
  date: Date;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type TransactionByCategory = {
  id: string;
  name: string;
  value: number;
  color: string;
};

export type Debt = {
  id: string;
  isMyDebt: boolean;
  active: boolean;
  amount: number;
  name: string;
  comment: string | null;
  date: Date;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

