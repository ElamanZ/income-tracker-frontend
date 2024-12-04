import { IconCashRegister, IconDeviceTabletDollar, IconSettings } from '@tabler/icons-react';
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
        icon: <IconCashRegister />
    },
    {
        id: 'transactions',
        path: '/transactions',
        title: 'Транзакции',
        icon: <IconDeviceTabletDollar />
    },
    {
        id: 'settings',
        path: '/settings',
        title: 'Настройки',
        icon: <IconSettings />
    },
];

