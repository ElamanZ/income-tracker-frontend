import { Select, Text } from '@mantine/core';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { IconCalendar } from '@tabler/icons-react';
import { createFileRoute, useSearch } from '@tanstack/react-router'
import dayjs from 'dayjs';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { transactionPageFiltersSchema } from '~/schemes/pageSearch/transaction.search';
import { useFetchCategories } from '~/services/category';
import { useFetchTransactions } from '~/services/transactions';


function TransactionsPage() {

    const portal = document.getElementById('title')



    const isMobile = useMediaQuery("(max-width: 767px)");


    const search = useSearch({ from: "/_app/transactions/" });

    const [dates, setDates] = useState<[DateValue, DateValue]>([
        search.fromDate ?? dayjs().startOf("month").toDate(),
        search.toDate ?? dayjs().endOf("month").toDate(),
    ]);
    const today = dayjs().minute(0).second(0).millisecond(0);


    const [categories] = useFetchCategories()
    const [transactions] = useFetchTransactions({
        categoryId: search.categories ?? '',
        // fromDate: search.fromDate ?? dates[0],
        // toDate: search.toDate ?? dates[1],
    })

    // useEffect(() => {
    //     navigate({
    //         to: "/transactions",
    //         search: (prev) => ({
    //             ...prev,
    //             fromDate: dates[0] ?? null,
    //             toDate: dates[1] ?? null,
    //         }),
    //     });
    // }, [dates, navigate]);


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
            <div className='flex flex-col gap-3'>

                <div className='flex justify-between gap-2'>
                    <Select
                        w={isMobile ? 150 : 200}
                        variant='default'
                        color='#1B1B3C'
                        size={isMobile ? 'xs' : 'md'}
                        radius='md'
                        placeholder="Категории"
                        data={categories.map((item) => ({
                            value: item.color,
                            label: item.name,
                        }))}
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

                {transactions.map((item) => (
                    <div className='flex justify-between bg-[#2B244C] bg-opacity-80 p-2 rounded-md mb-1'>
                        <div key={item.id} className='w-full'>
                            <div className='flex justify-between items-center'>
                                <Text size=''>{'Название категории'}</Text>
                                <Text size='sm' c='gray'>{dayjs(item.date).format('HH:mm')}</Text>
                            </div>
                            <div className='flex justify-between items-end'>
                                <Text c={item.isIncome ? 'green' : 'red'}>{`${item.isIncome ? '+' : '-'} ${item.amount} сом`}</Text>
                                <Text size='sm' c='gray'>{dayjs(item.date).format('DD.MM.YY')}</Text>
                            </div>
                        </div>
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
