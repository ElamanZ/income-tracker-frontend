

export type ProfileEntity = {
  id: string;
  avatarUrl: string | null;
  phone: string | null;
  updatedAt: string;
  createdAt: string;
  firstName?: string | null;
  lastName?: string | null;
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

export type Transaction = {
  id: string;
  comment: string | null;
  isIncome: boolean;
  amount: number;
  date: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type Debt = {
  id: string;
  isMyDebt: boolean;
  active: boolean;
  amount: number;
  name: string;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

