import { Text } from "@mantine/core"
import dayjs from "dayjs"
import { useFetchCategoryById } from "~/services/category"
import { Transaction } from "~/types/types"

type Props = {
    item: Transaction
}

const TransactionCard = ({ item }: Props) => {

    const [category] = useFetchCategoryById(item.categoryId)

    if (!item) return 'Нет данных!'

    return (
        <div className='flex justify-between bg-[#2B244C] bg-opacity-80 p-2 rounded-md mb-1'>
            <div key={item.id} className='w-full'>
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-1">
                        <Text>{category?.name}</Text>
                        {item.comment && (
                            <Text className="text-sm text-gray-300 italic">{`(${item.comment})`}</Text>
                        )}
                    </div>
                    <Text size='sm' c='gray'>{dayjs(item.date).format('HH:mm')}</Text>
                </div>
                <div className='flex justify-between items-end'>
                    <Text c={item.isIncome ? 'green' : 'red'}>{`${item.isIncome ? '+' : '-'}${item.amount} сом`}</Text>
                    <Text size='sm' c='gray'>{dayjs(item.date).format('DD.MM.YY')}</Text>
                </div>
            </div>
        </div>
    )
}

export default TransactionCard