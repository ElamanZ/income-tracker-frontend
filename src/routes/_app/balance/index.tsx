import { Button, Modal, Select, Text } from '@mantine/core'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { balancePageFiltersSchema } from '~/schemes/pageSearch/balance.search'
import { PieChart } from '@mantine/charts';
import dayjs from 'dayjs';
import { useGetMe } from '~/services/getMe';
import ReactDOM from 'react-dom';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { IconCalendar } from '@tabler/icons-react';
import '~/index.css'
import { useFetchCategories } from '~/services/category';
import CreateTransactionForm from '~/components/Transactions/CreateTransactionForm';
import { CreateTransactionArg, useCreateTransaction } from '~/services/transactions';

export const data = [
  { name: 'Такси', value: 1236, color: '#fa5252' },
  { name: 'Еда', value: 5388, color: 'yellow.6' },
  { name: 'Транспорт', value: 982, color: 'teal.6' },
  { name: 'Домой', value: 3000, color: 'green.6' },
  { name: 'Тренирова', value: 3000, color: 'gray.6' },
];

function BalancePage() {

  const [openedCreateIncomeModal, { open: openCreateIncomeModal, close: closeCreateIncomeModal }] = useDisclosure(false);

  const navigate = useNavigate({ from: "/balance" });
  const search = useSearch({ from: "/_app/balance/" });
  const [me] = useGetMe()
  const [categories] = useFetchCategories()

  const portal = document.getElementById('title')

  const isMobile = useMediaQuery("(max-width: 767px)");
  const [createTransaction] = useCreateTransaction();

  const handleCreateIncomeSubmit = (values: CreateTransactionArg) => {
    createTransaction(values);
    closeCreateIncomeModal();
  }


  const [dates, setDates] = useState<[DateValue, DateValue]>([
    search.fromDate ?? dayjs().startOf("month").toDate(),
    search.toDate ?? dayjs().endOf("month").toDate(),
  ]);
  const today = dayjs().minute(0).second(0).millisecond(0);



  useEffect(() => {
    navigate({
      to: "/balance",
      search: (prev) => ({
        ...prev,
        fromDate: dates[0] ?? null,
        toDate: dates[1] ?? null,
      }),
    });
  }, [dates, navigate]);


  return (
    <>
      <div>
        {portal && (
          ReactDOM.createPortal(
            <Text size='xl'>
              Balance
            </Text>,
            portal
          )
        )}
      </div>

      <div className='flex flex-col gap-3'>

        <div className='w-full bg-custom-bg-dark border border-white bg-opacity-65 flex flex-col gap-2 text-center rounded-xl p-2 '>
          <Text className='font-semibold text-2xl'>Баланс: {me?.profile.balance} сом</Text>
          <Text className='text-center text-lg text-[#B2B2B7]'>Затраты: {dayjs(search.fromDate).format('DD.MM.YY')} - {dayjs(search.toDate).format('DD.MM.YY')}</Text>
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

        <Text className='font-semibold text-xl text-center'>Потрачено: {me?.profile.balance} сом</Text>

        <div className='flex justify-center'>
          <PieChart
            withTooltip
            tooltipDataSource="segment"
            labelsPosition="inside"
            labelsType="value"
            withLabels
            strokeWidth={1}
            size={260}
            data={data}
          />

        </div>

        <div className='flex gap-2 mt-3'>
          <Button
            color="#30D8B1"
            radius="md"
            fullWidth
            size="md"
            onClick={openCreateIncomeModal}
          >
            Доход +
          </Button>

          <Button
            color="#EC4887"
            radius="md"
            fullWidth
            size="md"
            onClick={() => {
              console.log('Расход -')
            }}
          >
            Расход -
          </Button>
        </div>
        <Button
          color="#5D30D8"
          radius="md"
          fullWidth
          size="md"
          onClick={() => {
            console.log('Расход -')
          }}
        >
          Долг
        </Button>

      </div>

      <Modal
        opened={openedCreateIncomeModal}
        onClose={closeCreateIncomeModal}
        radius='md'
        title="Новая категория"
        size="sm"
      >
        <CreateTransactionForm isIncome={true} onSubmit={handleCreateIncomeSubmit} />
      </Modal>

    </>
  )
}







export const Route = createFileRoute('/_app/balance/')({
  component: BalancePage,
  validateSearch: balancePageFiltersSchema,
})
