import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { z } from "zod";
import { firestore } from "~/firebase";
import { dateString } from "~/schemes/dateString.schema";
import { Transaction, TransactionByCategory, TransactionsSchema } from "~/types/types";
import { baseAxios } from "~/utils/baseAxios";


export const createTransactionSchema = z.object({
    comment: z.string().optional(),
    isIncome: z.boolean(),
    amount: z.number().min(1, 'Это поле обязательное'),
    date: dateString,
    categoryId: z.string().min(1, 'Это поле обязательное'),
})

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionArg = z.infer<typeof createTransactionSchema>;
export type UpdateTransaction = z.infer<typeof updateTransactionSchema>;

export type TransactionFilterArg = {
    isIncome?: 'all' | 'true' | 'false';
    categoryId?: string;
    date?: Date;
    fromDate?: Date | null;
    toDate?: Date | null;
}

export type TransactionExpensesFilterArg = {
    categoryId?: string;
    fromDate?: Date | null;
    toDate?: Date | null;
}

export type UpdateTransactionArg = {
    id: string;
    data: UpdateTransaction;
}

export const createTransaction = async (arg: CreateTransactionArg) => {
    const { data } = await baseAxios.post<Transaction>('/transactions', arg);
    return data;
}

export const fetchTransactions = async (arg: TransactionFilterArg = {}) => {
    const { data } = await baseAxios.get<Transaction[]>('/transactions', { params: arg });
    return data;
}

export const fetchTransactionByCategory = async (arg: TransactionFilterArg = {}) => {
    const { data } = await baseAxios.get<TransactionByCategory[]>('/transactions/categories-summary', { params: arg });
    return data;
}

export const fetchExpensesTransactions = async (arg: TransactionExpensesFilterArg = {}) => {
    const { data } = await baseAxios.get<number>('/transactions/expenses', { params: arg });
    return data;
}

export const fetchIncomesTransactions = async (arg: TransactionExpensesFilterArg = {}) => {
    const { data } = await baseAxios.get<number>('/transactions/incomes', { params: arg });
    return data;
}

export const fetchTransactionById = async (id: string) => {
    const { data } = await baseAxios.get<Transaction>(`/transactions/${id}`);
    return data;
}

export const updateTransaction = async (arg: UpdateTransactionArg) => {
    const { data } = await baseAxios.patch<Transaction>(`/transactions/${arg.id}`, arg.data);
    return data;
}

export const deleteTransaction = async (id: string) => {
    const { data } = await baseAxios.delete<Transaction>(`/transactions/${id}`);
    return data;
}


export const useCreateTransaction = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'transaction' });
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'me' });
            toast.success('Транзакция успешно создана');
        },
        onError: () => {
            toast.error('Произошла ошибка');
        }
    });
    return [mutation.mutate, mutation] as const
}

export const fetchTransactionsV2 = async ({ }: TransactionFilterArg = {}) => {
    const transactionsCollection = collection(firestore, 'transactions');

    const snapshot = await getDocs(transactionsCollection);
    const data = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
        };
    });
    console.log(data)
    const parsedData = TransactionsSchema.array().safeParse(data);
    if (parsedData.error) {
        console.log(parsedData.error);
        throw parsedData.error;
    }
    return parsedData.success ? parsedData.data : [];
}

export const useFetchTransactions = (arg: TransactionFilterArg = {}) => {
    const query = useQuery({
        queryKey: ['transaction', arg],
        queryFn: () => fetchTransactions(arg),
    })
    return [query.data ?? [], query] as const
}

export const useFetchTransactionByCategory = (arg: TransactionFilterArg = {}) => {
    const query = useQuery({
        queryKey: ['transaction', 'categories-summary', arg],
        queryFn: () => fetchTransactionByCategory(arg),
    })
    return [query.data ?? [], query] as const
}

export const useFetchExpensesTransactions = (arg: TransactionExpensesFilterArg = {}) => {
    const query = useQuery({
        queryKey: ['transaction', 'expenses', arg],
        queryFn: () => fetchExpensesTransactions(arg),
    })
    return [query.data ?? 0, query] as const
}

export const useFetchIncomesTransactions = (arg: TransactionExpensesFilterArg = {}) => {
    const query = useQuery({
        queryKey: ['transaction', 'incomes', arg],
        queryFn: () => fetchIncomesTransactions(arg),
    })
    return [query.data ?? 0, query] as const
}

export const useFetchTransactionById = (id: string) => {
    const query = useQuery({
        queryFn: () => fetchTransactionById(id),
        queryKey: ['transaction', id],
    })
    return [query.data ?? null, query] as const
}

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateTransaction,
        onSuccess: (data) => {
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'transaction' });
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'me' });
            queryClient.setQueryData(['transaction', data.id], data)
            toast.success('Транзакция успешно обновлена');
        },
        onError: () => {
            toast.error('Произошла ошибка');
        }
    });
    return [mutation.mutate, mutation] as const
}

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'transaction' });
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'me' });
            toast.success('Транзакция успешно удалена');
        },
        onError: () => {
            toast.error('Произошла ошибка');
        }
    });
    return [mutation.mutate, mutation] as const
}