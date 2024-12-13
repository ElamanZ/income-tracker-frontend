import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { Category, GroupedCategories } from "~/types/types";
import { baseAxios } from "~/utils/baseAxios";

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Это поле обязательное'),
    color: z.string().min(1, 'Это поле обязательное'),
    isIncome: z.boolean().default(true),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryArg = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;

export type CategoryFilterArg = {
    isIncome?: boolean;
    name?: string;
}

export type UpdateCategoryArg = {
    id: string;
    data: UpdateCategory;
}

export const createCatygory = async (arg: CreateCategoryArg) => {
    const { data } = await baseAxios.post<Category>('/category', arg);
    return data;
}

export const fetchCategories = async (arg: CategoryFilterArg = {}) => {
    const { data } = await baseAxios.get<Category[]>('/category', { params: arg });
    return data;
}

export const fetchGroupedCategories = async () => {
    const { data } = await baseAxios.get<GroupedCategories>('/category/grouped');
    return data;
}

export const fetchCategoryById = async (id: string) => {
    const { data } = await baseAxios.get<Category>(`/category/${id}`);
    return data;
}

export const updateCategory = async (arg: UpdateCategoryArg) => {
    const { data } = await baseAxios.patch<Category>(`/category/${arg.id}`, arg.data);
    return data;
}

export const deleteCategory = async (id: string) => {
    const { data } = await baseAxios.delete<Category>(`/category/${id}`);
    return data;
}


export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createCatygory,
        onSuccess: () => {
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'category' });
            toast.success('Категория успешно создана');
        },
        onError: () => {
            toast.error('Произошла ошибка');
        }
    });
    return [mutation.mutate, mutation] as const
}

export const useFetchGroupedCategories = () => {
    const query = useQuery({
        queryKey: ['category'],
        queryFn: () => fetchGroupedCategories(),
    })
    return [query.data ?? { income: [], expense: [] }, query] as const;
}

export const useFetchCategories = (arg: CategoryFilterArg = {}) => {
    const query = useQuery({
        queryKey: ['category', arg],
        queryFn: () => fetchCategories(arg),
    })
    return [query.data ?? [], query] as const
}

export const useFetchCategoryById = (id: string) => {
    const query = useQuery({
        queryFn: () => fetchCategoryById(id),
        queryKey: ['category', id],
    })
    return [query.data ?? null, query] as const
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateCategory,
        onSuccess: (data) => {
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'category' });
            queryClient.setQueryData(['category', data.id], data)
            toast.success('Категория успешно обновлена');
        },
        onError: () => {
            toast.error('Произошла ошибка');
        }
    });
    return [mutation.mutate, mutation] as const
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'category' });
            toast.success('Категория успешно удалена');
        },
        onError: () => {
            toast.error('Удаление не возможно, категория используется в транзакциях');
        }
    });
    return [mutation.mutate, mutation] as const
}
