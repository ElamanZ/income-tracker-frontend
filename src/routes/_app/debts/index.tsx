import { Select, Text, TextInput } from '@mantine/core';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { IconCalendar, IconSearch } from '@tabler/icons-react';
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { debtsPageFiltersSchema } from '~/schemes/pageSearch/debts.search';
import { debtsFilterActive, debtsFilterIsMyDebt } from '~/types/enums';


function DebtsPage() {

    const portal = document.getElementById('title')
    const isMobile = useMediaQuery("(max-width: 767px)");
    const search = useSearch({ from: "/_app/debts/" });
    const navigate = useNavigate();

    const [dates, setDates] = useState<[DateValue, DateValue]>([
        search.fromDate ?? dayjs().startOf("month").toDate(),
        search.toDate ?? dayjs().endOf("month").toDate(),
    ]);

    const [activeDebts, setActiveDebts] = useState(search.active ?? true);
    const [isMyDebt, setIsMyDebt] = useState(search.isMyDebt ?? true);
    const [searchText, setSearchText] = useState('');

    const today = dayjs().minute(0).second(0).millisecond(0);





    useEffect(() => {
        navigate({
            to: "/debts",
            search: (prev) => ({
                ...prev,
                active: activeDebts,
                isMyDebt: isMyDebt,
                q: searchText,
                fromDate: dates[0] ?? null,
                toDate: dates[1] ?? null,
            }),
        });
    }, [dates, navigate, activeDebts, isMyDebt, searchText]);

    return (
        <>
            <div>
                {portal && (
                    ReactDOM.createPortal(
                        <Text size='xl'>
                            Долги
                        </Text>,
                        portal
                    )
                )}
            </div>

            <div>
                <div className='flex flex-col gap-2'>

                    <div className='flex justify-between gap-2'>
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

                        <TextInput
                            w={isMobile ? 150 : 200}
                            className="min-w-220"
                            placeholder="Поиск"
                            rightSection={<IconSearch size={16} />}
                            radius="md"
                            size={isMobile ? 'xs' : 'md'}
                            defaultValue={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                    </div>

                    <div className='flex justify-between gap-2'>
                        <Select
                            w={isMobile ? 150 : 200}
                            variant="default"
                            color="#1B1B3C"
                            size={isMobile ? "xs" : "md"}
                            radius="md"
                            value={activeDebts ? "true" : "false"}
                            onChange={(val) => setActiveDebts(val === "true")}
                            data={debtsFilterActive}
                            searchable
                            clearable
                        />

                        <Select
                            w={isMobile ? 150 : 200}
                            variant="default"
                            color="#1B1B3C"
                            size={isMobile ? "xs" : "md"}
                            radius="md"
                            value={isMyDebt ? "true" : "false"}
                            onChange={(val) => {
                                setIsMyDebt(val === "true");
                                navigate({
                                    from: "/debts",
                                    to: "/debts",
                                    search: (prev) => ({
                                        ...prev,
                                        isMyDebt: val === "true",
                                    }),
                                })
                            }}
                            data={debtsFilterIsMyDebt}
                            searchable
                            clearable
                        />
                    </div>


                </div>
            </div>
        </>
    )
}




export const Route = createFileRoute('/_app/debts/')({
    component: DebtsPage,
    validateSearch: debtsPageFiltersSchema
})
