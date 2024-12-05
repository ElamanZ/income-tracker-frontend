import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import * as z from 'zod';
import { baseAxiosAnon } from '../utils/baseAxios';
import { ProfileEntity } from '../types/types';
import { Me } from './getMe';
import { useNavigate } from '@tanstack/react-router';
import { Tokens } from './tokens';
import { parsePhoneNumberSchema } from '~/utils/parsePhoneNumbersFromText';


export const signUpSchema = z.object({
  firstName: z.string().nonempty('Имя не должно быть пустым'),
  lastName: z.string().nonempty('Фамилия не должна быть пустой'),
  phone: parsePhoneNumberSchema,
  avatarUrl: z.string().url('Некорректный URL аватара').optional().nullable(),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  passwordConfirm: z.string().min(6, 'Подтверждение пароля должно содержать минимум 6 символов'),
}).refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm'],
  }
);

export type SignUpArg = z.infer<typeof signUpSchema>;

export const signUp = async (arg: SignUpArg): Promise<Me> => {
  const parsedArg = signUpSchema.parse(arg);
  const { data: tokens } = await baseAxiosAnon.post<Tokens>('/auth/sign-up', parsedArg);
  const { data: profile } = await baseAxiosAnon.get<ProfileEntity>(`/auth/me`, {
    headers: {
      'Authorization': `Bearer ${tokens.accessToken}`
    }
  });
  return { tokens, profile };
}

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signUp,

    onSuccess(me) {
      queryClient.setQueryData<Me>(['me'], me);
      toast.success('Вы успешно зарегистрировались');
      navigate({ to: '/' })
    },
    onError(error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        const data = error.response?.data as { message: string };
        if (data.message) {
          toast.error(`Что-то пошло не так: ${data.message}`);
        }
      }
    },
  });

  return [mutation.mutate, mutation] as const;
}