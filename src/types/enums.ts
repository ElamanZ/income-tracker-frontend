import { ComboboxData, SegmentedControlItem } from "@mantine/core";

export const CategoryType = {
    isIncome: true,
    isNotIncome: false,
} as const;

export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType];

export const categoryTypeSelectItems: SegmentedControlItem[] = [
    {
        value: "true",
        label: "Доход",
    },
    {
        value: "false",
        label: "Расход",
    },
];

export const debtTypeSelectItems: SegmentedControlItem[] = [
    {
        value: "true",
        label: "Мой долг",
    },
    {
        value: "false",
        label: "Мне должны",
    },
];



export const debtsFilterActive: ComboboxData = [
    {
        value: "all",
        label: "Все",
    },
    {
        value: "true",
        label: "Активные",
    },
    {
        value: "false",
        label: "Неактивные",
    },
];
export const transactionsFilterIsIncome: ComboboxData = [
    {
        value: "false",
        label: "Расходы",
    },
    {
        value: "all",
        label: "Все",
    },
    {
        value: "true",
        label: "Доходы",
    },
];

export const debtsFilterIsMyDebt: ComboboxData = [
    {
        value: "all",
        label: "Все",
    },
    {
        value: "true",
        label: "Мои долги",
    },
    {
        value: "false",
        label: "Долги мне",
    },
];


