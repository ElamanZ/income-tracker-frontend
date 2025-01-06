import { Loader, Select, Text } from '@mantine/core';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { IconCalendar } from '@tabler/icons-react';
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import TransactionCard from '~/components/Transactions/TransactionCard';
import { transactionPageFiltersSchema } from '~/schemes/pageSearch/transaction.search';
import { useFetchCategories } from '~/services/category';
import { useFetchTransactions } from '~/services/transactions';


function TransactionsPage() {

    const portal = document.getElementById('title')
    const isMobile = useMediaQuery("(max-width: 767px)");
    const search = useSearch({ from: "/_app/transactions/" });
    const navigate = useNavigate();

    const [dates, setDates] = useState<[DateValue, DateValue]>([
        search.fromDate ?? dayjs().startOf("month").toDate(),
        search.toDate ?? dayjs().endOf("month").toDate(),
    ]);

    const today = dayjs().minute(0).second(0).millisecond(0);

    const [categories] = useFetchCategories()

    const [transactions, { isLoading, error }] = useFetchTransactions({
        categoryId: search.categoryId ?? '',
        fromDate: search.fromDate ?? dayjs().startOf('month').toDate(),
        toDate: search.toDate ?? dayjs().endOf('month').toDate(),
        isIncome: 'all'
    })


    useEffect(() => {
        navigate({
            to: "/transactions",
            search: (prev) => ({
                ...prev,
                fromDate: dates[0] ?? null,
                toDate: dates[1] ?? null,
            }),
        });
    }, [dates, navigate]);

    if (error) {
        return <div className='flex justify-center w-full items-center h-screen'>
            <Text c="red">Ошибка при загрузке данных: {error.message}</Text>
        </div>
    }

    if (isLoading) {
        return <div className='flex justify-center w-full items-center h-screen'>
            <Loader />
        </div>
    }



    return (
        <>
            <div>
                {portal && (
                    ReactDOM.createPortal(
                        <Text size='xl'>
                            Транзакции
                        </Text>,
                        portal
                    )
                )}
            </div>

            <div className='flex flex-col gap-3 p-3'>
                <div className='flex justify-between gap-2'>
                    <Select
                        w={isMobile ? 150 : 200}
                        variant='default'
                        color='#1B1B3C'
                        size={isMobile ? 'xs' : 'md'}
                        radius='md'
                        placeholder="Категории"
                        data={categories.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))}
                        onChange={(value) => {
                            navigate({
                                to: "/transactions",
                                search: (prev) => ({
                                    ...prev,
                                    categoryId: value || null,
                                }),
                            })
                        }}
                        value={search.categoryId}
                        searchable
                        clearable
                    />

                    <DatePickerInput
                        w={isMobile ? 150 : 200}
                        type="range"
                        leftSection={<IconCalendar size={16} />}
                        size={isMobile ? 'xs' : 'md'}
                        radius='md'
                        value={dates}
                        valueFormat='DD.MM'
                        defaultValue={[today.toDate(), today.toDate()]}
                        onChange={(value) => setDates(value)}
                    />
                </div>

                {transactions.length === 0 && (
                    <Text>Список транзакций пуст</Text>
                )}

                {transactions.map((item) => (
                    <div key={item.id}>
                        <TransactionCard key={item.id} item={item} />
                    </div>
                ))}

            </div>
        </>
    )
}


export const Route = createFileRoute('/_app/transactions/')({
    component: TransactionsPage,
    validateSearch: transactionPageFiltersSchema,
})
