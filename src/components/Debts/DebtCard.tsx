import { Button, Popover, Text } from "@mantine/core"
import { modals, openContextModal } from "@mantine/modals"
import { IconDots, IconPencil, IconSquareRoundedCheck, IconSquareRoundedX, IconTrash } from "@tabler/icons-react"
import dayjs from "dayjs"
import { useDeleteDebt, useUpdateDebt } from "~/services/debts"
import { Debt } from "~/types/types"
import { cn } from "~/utils/cn"


type Props = {
    item: Debt
}


const DebtCard = ({ item }: Props) => {


    const [updatedebt] = useUpdateDebt();
    const [deleteDebt] = useDeleteDebt();

    const handleUpdateDebtActive = (currentActive: boolean, id: string) => {
        updatedebt({ id, data: { active: !currentActive } });
    };;


    const handleDeleteDebt = (id: string) => {
        deleteDebt(id);
    }

    const openConfirmModal = (currentActive: boolean, id: string) =>
        modals.openConfirmModal({
            title: `Вы уверены, что хотите ${currentActive ? 'деактивировать' : 'активировать'} этот долг?`,
            labels: { confirm: 'Да', cancel: 'Отмена' },
            confirmProps: { color: '#30D8B1' },
            cancelProps: { color: '' },
            onConfirm: () => handleUpdateDebtActive(currentActive, id),
        });



    const handleUpdateDebt = (item: Debt) => {
        openContextModal({
            modal: 'updateDebtModal',
            title: 'Редактировать долг',
            innerProps: {
                id: item.id,
                amount: item.amount,
                comment: item.comment ?? '',
                date: item.date,
                name: item.name,
                isMyDebt: item.isMyDebt,
                active: item.active,
            },
            size: 'xl',
        });
    }

    const openDeleteModal = (id: string) => modals.openConfirmModal({
        title: 'Вы уверены что хотите удалить этот долг?',
        labels: { confirm: 'Да', cancel: 'Отмена' },
        confirmProps: { color: 'red' },
        cancelProps: { color: '' },
        onConfirm: () => handleDeleteDebt(id),
    });

    if (!item) return 'Нет данных!'

    return (
        <div className='flex justify-between items-center gap-1 bg-[#2B244C] bg-opacity-80 p-2 rounded-md mb-1'>
            <div key={item.id} className='w-full'>
                <div className="flex justify-between items-center">
                    <Text size="sm" className="text-gray-500">{item.isMyDebt ? 'Мой долг' : 'Долг мне'}</Text>
                    <Popover
                        width={40}
                        offset={0}
                        position="bottom"
                        withArrow shadow="md"
                        zIndex={0}
                    >
                        <Popover.Target>
                            <IconDots size={28} color="gray" />
                        </Popover.Target>
                        <Popover.Dropdown
                            className="flex flex-col justify-center items-center gap-2"
                        >
                            <Button
                                variant="outline"
                                p={0}
                                w={28}
                                h={28}
                                onClick={() => handleUpdateDebt(item)}
                            >
                                <IconPencil size={16} />
                            </Button>
                            <Button
                                variant="outline"
                                p={0}
                                w={28}
                                h={28}
                                onClick={() => openDeleteModal(item.id)}
                            >
                                <IconTrash size={16} color="red" />
                            </Button>
                        </Popover.Dropdown>
                    </Popover>
                </div>
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-1">
                        <Text>{item?.name}</Text>
                        {item.comment && (
                            <Text className="text-sm text-gray-300 italic">{`(${item.comment})`}</Text>
                        )}
                    </div>
                    <Text size='sm' className="text-gray-500">{dayjs(item.date).format('DD.MM.YY')}</Text>
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