import { Button, Text } from '@mantine/core'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import BalanceHeader from '~/components/Balance/BalanceHeader'
import { balancePageFiltersSchema } from '~/schemes/pageSearch/balance.search'
import { PieChart } from '@mantine/charts';
import dayjs from 'dayjs';
import { useGetMe } from '~/services/getMe';


export const data = [
  { name: 'Такси', value: 1236, color: '#fa5252' },
  { name: 'Еда', value: 5388, color: 'yellow.6' },
  { name: 'Транспорт', value: 982, color: 'teal.6' },
  { name: 'Домой', value: 3000, color: 'green.6' },
  { name: 'Тренирова', value: 3000, color: 'gray.6' },
];

function BalancePage() {

  const search = useSearch({ from: "/_app/balance/" });
  const [me] = useGetMe()

  console.log(me, 'me');

  return (
    <>
      <BalanceHeader />

      <div className='flex flex-col gap-3'>

        <div className='w-full border-2 border-[#62B440] rounded-md text-[#62B440] text-center'>
          <Text className='font-semibold'>Баланс</Text>
          <Text className='font-semibold'>{me?.profile.balance} сом</Text>
        </div>

        <div className='flex gap-2 items-center'>
          <Text className='text-center'>Затраты</Text>
          <Text className='text-center'>
            {dayjs(search.fromDate).format('DD.MM.YY')} - {dayjs(search.toDate).format('DD.MM.YY')}
          </Text>
        </div>

        <div className='flex justify-center'>
          <PieChart
            withTooltip
            mx="auto"
            tooltipDataSource="segment"
            labelsPosition="inside"
            labelsType="value"
            withLabels
            strokeWidth={2}
            size={290}
            data={data} />
        </div>

        <div className='flex gap-2'>
          <Button
            variant="outline"
            color="green"
            radius="md"
            fullWidth
            size="md"
            onClick={() => {
              console.log('Доход +')
            }}
          >
            Доход +
          </Button>

          <Button
            variant="outline"
            color="red"
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
          variant="outline"
          color="violet"
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
    </>
  )
}







export const Route = createFileRoute('/_app/balance/')({
  component: BalancePage,
  validateSearch: balancePageFiltersSchema,
})
