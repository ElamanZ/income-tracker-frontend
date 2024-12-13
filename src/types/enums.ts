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


export const debtsFilterActive: ComboboxData = [
    {
        value: "true",
        label: "Активные",
    },
    {
        value: "false",
        label: "Неактивные",
    },
];

export const debtsFilterIsMyDebt: ComboboxData = [
    {
        value: "true",
        label: "Мои долги",
    },
    {
        value: "false",
        label: "Долги мне",
    },
];


