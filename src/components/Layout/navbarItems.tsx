import { IconCashRegister, IconCategory, IconDeviceTabletDollar, IconUserDollar } from '@tabler/icons-react';
import { FileRoutesByPath } from '@tanstack/react-router';
import type { ReactNode } from 'react';


export type NavbarItem = {
    id: string,
    title: string,
    path: FileRoutesByPath[keyof FileRoutesByPath]['fullPath'],
    icon: ReactNode,
    params?: Record<string, string>,
    search?: Record<string, unknown>
}

export const navbarItems: NavbarItem[] = [
    {
        id: 'balance',
        path: '/balance',
        title: 'Баланс',
        icon: <IconCashRegister size={45} />
    },
    {
        id: 'categories',
        path: '/categories',
        title: 'Категории',
        icon: <IconCategory size={45} />
    },
    {
        id: 'transactions',
        path: '/transactions',
        title: 'Транзакции',
        icon: <IconDeviceTabletDollar size={45} />
    },
    {
        id: 'debts',
        path: '/debts',
        title: 'Долги',
        icon: <IconUserDollar size={45} />
    },
];

