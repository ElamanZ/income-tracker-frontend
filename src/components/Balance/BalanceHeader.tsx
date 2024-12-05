import ReactDOM from 'react-dom';
import LogoWithText2 from '../Logo/LogoWithText2';
import { Select } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import dayjs from 'dayjs';

const BalanceHeader = () => {


    const search = useSearch({ from: "/_app/balance/" });
    const navigate = useNavigate({ from: "/balance" });

    const portal = document.getElementById('header')
    const isMobile = useMediaQuery("(max-width: 767px)");
    const [dates, setDates] = useState<[DateValue, DateValue]>([
        search.fromDate ?? dayjs().startOf("month").toDate(),
        search.toDate ?? dayjs().endOf("month").toDate(),
    ]);
    const today = dayjs().minute(0).second(0).millisecond(0);

    return (
        <>
            {portal && (
                ReactDOM.createPortal(
                    <div className='flex gap-2'>
                        {!isMobile && <LogoWithText2 size={150} />}


                        <Select
                            w={isMobile ? 100 : 200}
                            variant="default"
                            size={isMobile ? 'xs' : 'md'}
                            radius='md'
                            placeholder="Категории"
                            searchable
                        // data={categories.map((item) => ({
                        //     value: item.id,
                        //     label: item.name,
                        // }))}
                        />
                        <DatePickerInput
                            type="range"
                            leftSection={<IconCalendar size={16} />}
                            size={isMobile ? 'xs' : 'md'}
                            radius='md'
                            value={dates}
                            valueFormat='DD.MM'
                            defaultValue={[today.toDate(), today.toDate()]}
                            onChange={(value) => {
                                setDates(value)
                                if (value[0] && value[1]) {
                                    navigate({
                                        search: (prev) => ({
                                            ...prev,
                                            fromDate: value[0] || today.toDate(),
                                            toDate: value[1] || today.toDate(),
                                        }),
                                    });
                                }
                            }}
                        />
                    </div>,
                    portal
                )
            )}
        </>
    )
}

export default BalanceHeader