import { Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { IconSquareRoundedCheck, IconSquareRoundedX } from "@tabler/icons-react"
import dayjs from "dayjs"
import { useUpdateDebt } from "~/services/debts"
import { Debt } from "~/types/types"
import { cn } from "~/utils/cn"


type Props = {
    item: Debt
}


const DebtCard = ({ item }: Props) => {


    const [updatedebt] = useUpdateDebt();

    const handleUpdateDebtActive = (currentActive: boolean, id: string) => {
        updatedebt({ id, data: { active: !currentActive } });
    };;

    const openConfirmModal = (currentActive: boolean, id: string) =>
        modals.openConfirmModal({
            title: `Вы уверены, что хотите ${currentActive ? 'деактивировать' : 'активировать'} этот долг?`,
            labels: { confirm: 'Да', cancel: 'Отмена' },
            confirmProps: { color: '#30D8B1' },
            cancelProps: { color: '' },
            onConfirm: () => handleUpdateDebtActive(currentActive, id),
        });


    if (!item) return 'Нет данных!'

    return (
        <div className='flex justify-between bg-[#2B244C] bg-opacity-80 p-2 rounded-md mb-1'>
            <div key={item.id} className='w-full'>
                <div className="flex justify-between items-center">
                    <Text size="sm" className="text-gray-500">{item.isMyDebt ? 'Мой долг' : 'Долг мне'}</Text>
                    <Text size='sm' className="text-gray-500">{dayjs(item.date).format('DD.MM.YY')}</Text>
                </div>
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-1">
                        <Text>{item?.name}</Text>
                        {item.comment && (
                            <Text className="text-sm text-gray-300 italic">{`(${item.comment})`}</Text>
                        )}
                    </div>
                    <Text size='sm' className="text-gray-500">{dayjs(item.date).format('HH:mm')}</Text>
                </div>
                <div className='flex justify-between items-end'>
                    <Text
                        c={item.isMyDebt ? 'orange' : 'blue'}
                        className={cn('', { 'line-through': !item.active })}
                    >
                        {`${item.amount} сом`}
                    </Text>
                    <div className="flex gap-2 items-center" onClick={() => openConfirmModal(item.active, item.id)}>
                        <Text size="xs">Вернул</Text>
                        {item.active ? (
                            <IconSquareRoundedX size={24} color="red" />
                        ) : (
                            <IconSquareRoundedCheck size={24} color="green" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebtCard