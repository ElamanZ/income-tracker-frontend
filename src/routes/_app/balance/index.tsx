import { Button, Loader, Select, Text } from '@mantine/core'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { balancePageFiltersSchema } from '~/schemes/pageSearch/balance.search'
import { PieChart } from '@mantine/charts';
import dayjs from 'dayjs';
import { useGetMe } from '~/services/getMe';
import ReactDOM from 'react-dom';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { IconCalendar } from '@tabler/icons-react';
import '~/index.css'
import { useFetchCategories } from '~/services/category';
import { openContextModal } from '@mantine/modals';
import { useFetchExpensesTransactions, useFetchIncomesTransactions, useFetchTransactionByCategory } from '~/services/transactions';
import { transactionsFilterIsIncome } from '~/types/enums';

// export const dataForPieChart = [
//   { name: 'Такси', value: 1236, color: '#fa5252' },
//   { name: 'Еда', value: 5388, color: 'yellow.6' },
//   { name: 'Транспорт', value: 982, color: 'teal.6' },
//   { name: 'Домой', value: 3000, color: 'green.6' },
//   { name: 'Тренирова', value: 3000, color: 'gray.6' },
// ];

function BalancePage() {

  const portal = document.getElementById('title')
  const isMobile = useMediaQuery("(max-width: 767px)");

  const navigate = useNavigate({ from: "/balance" });
  const search = useSearch({ from: "/_app/balance/" });

  const [dates, setDates] = useState<[DateValue, DateValue]>([
    search.fromDate ?? dayjs().startOf("month").toDate(),
    search.toDate ?? dayjs().endOf("month").toDate(),
  ]);

  const [isIncome, setIsIncome] = useState(search.isIncome ?? 'all');


  const [me] = useGetMe()
  const [categories] = useFetchCategories()
  const [dataForPieChart] = useFetchTransactionByCategory({
    categoryId: search.categoryId ?? '',
    fromDate: search.fromDate ?? null,
    toDate: search.toDate ?? null,
    isIncome: search.isIncome ?? 'all',
  })

  const [expense, { isLoading }] = useFetchExpensesTransactions({
    categoryId: search.categoryId ?? '',
    fromDate: search.fromDate ?? null,
    toDate: search.toDate ?? null,
  })

  const [incomes, { isLoading: isLoadingIncomes }] = useFetchIncomesTransactions({
    categoryId: search.categoryId ?? '',
    fromDate: search.fromDate ?? null,
    toDate: search.toDate ?? null,
  })

  const today = dayjs().minute(0).second(0).millisecond(0);


  useEffect(() => {
    navigate({
      to: "/balance",
      search: (prev) => ({
        ...prev,
        fromDate: dates[0] ?? null,
        toDate: dates[1] ?? null,
        isIncome: isIncome,

      }),
    });
  }, [dates, navigate, isIncome]);


  const handleCreateTransaction = (isIncome: boolean) => {
    openContextModal({
      modal: 'createTransactionModal',
      title: 'Новая транзакция',
      innerProps: {
        isIncome,
      },
      size: 'xl',
    });
  }

  const handleCreateDebt = () => {
    openContextModal({
      modal: 'createDebtModal',
      title: 'Новый долг',
      innerProps: {},
      size: 'xl',
    });
  }


  console.log(dataForPieChart, 'dataForPieChart');


  return (
    <>
      <div>
        {portal && (
          ReactDOM.createPortal(
            <Text size='xl'>
              Баланс
            </Text>,
            portal
          )
        )}
      </div>

      <div className='flex flex-col gap-3'>

        <div className='w-full bg-custom-bg-dark border border-white bg-opacity-65 flex flex-col gap-2 text-center rounded-xl p-2 '>
          <Text className='font-semibold text-2xl'>Баланс: {me?.profile.balance} сом</Text>
          <Text className='text-center text-lg text-[#B2B2B7]'>Период: {dayjs(search.fromDate).format('DD.MM.YY')} - {dayjs(search.toDate).format('DD.MM.YY')}</Text>
        </div>

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
                to: "/balance",
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
        <div>
          {isLoading ? (
            <div className='w-full flex justify-center items-center'>
              <Loader />
            </div>
          ) : (
            <Text className='font-semibold text-lg text-center'>Потрачено: {expense} сом</Text>
          )}

          {isLoadingIncomes ? (
            <div className='w-full flex justify-center items-center'>
              <Loader />
            </div>
          ) : (
            <Text className='font-semibold text-lg text-center'>Заработано: {incomes} сом</Text>
          )}
        </div>

        <div className='w-full flex justify-end'>
          <Select
            w={isMobile ? 100 : 200}
            variant="default"
            color="#1B1B3C"
            size={isMobile ? "xs" : "md"}
            defaultValue={isIncome}
            radius="md"
            value={isIncome}
            onChange={(val) => setIsIncome(val as 'all' | 'true' | 'false')}
            data={transactionsFilterIsIncome}
          />
        </div>

        {dataForPieChart.length !== 0 ? (
          <div className='flex justify-center'>
            <PieChart
              withTooltip
              tooltipDataSource="segment"
              labelsPosition="inside"
              labelsType="value"
              strokeWidth={1}
              size={260}
              withLabels
              data={dataForPieChart}
              strokeColor='white'
              labelColor='white'
              className='text-white'
            />
          </div>
        ) : (
          <div className='flex justify-center min-h-48'>
            <Text className='font-semibold text-lg text-center'>Нет данных</Text>
          </div >
        )}

        <div className='flex gap-2 mt-3'>
          <Button
            color="#30D8B1"
            radius="md"
            fullWidth
            size="md"
            onClick={() => handleCreateTransaction(true)}
          >
            Доход +
          </Button>

          <Button
            color="#EC4887"
            radius="md"
            fullWidth
            size="md"
            onClick={() => handleCreateTransaction(false)}
          >
            Расход -
          </Button>
        </div>

        <Button
          color="#5D30D8"
          radius="md"
          fullWidth
          size="md"
          onClick={handleCreateDebt}
        >
          Долг
        </Button>
      </div >
    </>
  )
}


export const Route = createFileRoute('/_app/balance/')({
  component: BalancePage,
  validateSearch: balancePageFiltersSchema,
})
