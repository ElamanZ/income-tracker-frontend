import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { baseAxiosAnon } from '../utils/baseAxios';
import { z } from 'zod';
import { ProfileEntity } from '../types/types';
import { Me } from './getMe';
import { Tokens } from './tokens';


export const loginSchema = z.object({
  phone: z.string(),
  password: z.string().optional(),
})

export type LoginArg = z.infer<typeof loginSchema>;

export const login = async (arg: LoginArg): Promise<Me> => {
  const parsedArg = loginSchema.parse(arg);
  const { data: tokens } = await baseAxiosAnon.post<Tokens>('/auth/sign-in', parsedArg);
  const { data: profile } = await baseAxiosAnon.get<ProfileEntity>(`/auth/me`, {
    headers: {
      'Authorization': `Bearer ${tokens.accessToken}`
    }
  });
  return {
    tokens,
    profile,
  }
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess(me) {
      queryClient.setQueryData<Me>(['me'], me);
      toast.success('Вы успешно вошли в аккаунт');
    },
    onError(error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        const data = error.response?.data as { message: string };
        if (data.message) {
          toast.error(data.message);
        }
      }
    },
  });

  return [mutation.mutate, mutation] as const;
}
