

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

