

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

