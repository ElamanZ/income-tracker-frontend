import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';
import { useGetMe } from '~/services/getMe';

function AuthLayout() {
    const navigate = useNavigate();
    const [me] = useGetMe();

    useEffect(() => {
        if (me) {
            navigate({ to: '/balance' })
        }
    }, [me]);

    return <Outlet />
}

export const Route = createFileRoute('/_auth')({
    component: AuthLayout,
})
