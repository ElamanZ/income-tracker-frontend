import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { Debt } from "~/types/types";
import { baseAxios } from "~/utils/baseAxios";


export const createDebtSchema = z.object({
    isMyDebt: z.boolean().default(true),
    active: z.boolean().default(true),
    amount: z.number().min(1, 'Это поле обязательное'),
    name: z.string().min(1, 'Это поле обязательное'),
    comment: z.string().optional(),
})

export const updateDebtSchema = createDebtSchema.partial();

export type CreateDebtArg = z.infer<typeof createDebtSchema>;
export type UpdateDebt = z.infer<typeof updateDebtSchema>;

export type DebtFilterArg = {
    isMyDebt?: boolean;
    active?: boolean;
    name?: string;
}

export type UpdateDebtArg = {
    id: string;
    data: UpdateDebt;
}

export const createDebt = async (arg: CreateDebtArg) => {
    const { data } = await baseAxios.post<Debt>('/debts', arg);
    return data;
}

export const fetchDebts = async (arg: DebtFilterArg = {}) => {
    const { data } = await baseAxios.get<Debt[]>('/debts', { params: arg });
    return data;
}

export const fetchDebtById = async (id: string) => {
    const { data } = await baseAxios.get<Debt>(`/debts/${id}`);
    return data;
}

export const updateDebt = async (arg: UpdateDebtArg) => {
    const { data } = await baseAxios.patch<Debt>(`/debts/${arg.id}`, arg.data);
    return data;
}

export const deleteDebt = async (id: string) => {
    const { data } = await baseAxios.delete<Debt>(`/debts/${id}`);
    return data;
}


export const useCreateDebt = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createDebt,
        onSuccess: () => {
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'debt' });
            toast.success('Долг успешно создан');
        }
    });
    return [mutation.mutate, mutation] as const
}

export const useFetchDebts = (arg: DebtFilterArg = {}) => {
    const query = useQuery({
        queryKey: ['debt', arg],
        queryFn: () => fetchDebts(arg),
    })
    return [query.data ?? [], query] as const
}

export const useFetchDebtById = (id: string) => {
    const query = useQuery({
        queryFn: () => fetchDebtById(id),
        queryKey: ['debt', id],
    })
    return [query.data ?? null, query] as const
}

export const useUpdateDebt = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateDebt,
        onSuccess: (data) => {
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'debt' });
            queryClient.setQueryData(['debt', data.id], data)
            toast.success('Долг успешно обновлен');
        }
    });
    return [mutation.mutate, mutation] as const
}

export const useDeleteDebt = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteDebt,
        onSuccess: () => {
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'debt' });
            toast.success('Долг успешно удален');
        }
    });
    return [mutation.mutate, mutation] as const
}