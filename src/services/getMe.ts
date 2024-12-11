import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Tokens } from './tokens';
import { storage } from '../lib/storage';
import { ProfileEntity } from '../types/types';
import { baseAxios, baseAxiosAnon } from '../utils/baseAxios';


export const fetchUser = async () => {
    const { data } = await baseAxios.get<ProfileEntity>(`/auth/me`);
    return data;
}

export type Me = {
    profile: ProfileEntity;
    tokens: Tokens;
}

export const refreshMe = async (): Promise<Me> => {
    const me = storage.get('me');

    const { data: tokens } = await baseAxiosAnon.post<Tokens>('/auth/refresh/', null, {
        headers: {
            'Authorization': `Bearer ${me?.tokens.refreshToken}`,
        }
    });
    const { data: profile } = await baseAxiosAnon.get<ProfileEntity>(`/auth/me`, {
        headers: {
            'Authorization': `Bearer ${tokens.accessToken}`,
        }
    });
    return {
        tokens,
        profile
    };
}

export const useGetMe = () => {
    const query = useQuery({
        queryFn: refreshMe,
        queryKey: ['me'],
        refetchInterval: 1000 * 60 * 60 * 1, // 1 hour
        staleTime: 1000 * 60 * 60 * 1, // 1 hour
        initialData: () => {
            const me = storage.get('me');
            return me;
        },
    });

    useEffect(() => {
        storage.set('me', query.data ?? null);
    }, [query.data]);

    return [query.data ?? null, query] as const;
}