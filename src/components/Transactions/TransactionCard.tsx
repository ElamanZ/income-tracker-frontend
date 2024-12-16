import { Button, Popover, Text } from "@mantine/core"
import { modals, openContextModal } from "@mantine/modals"
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react"
import dayjs from "dayjs"
import { useFetchCategoryById } from "~/services/category"
import { useDeleteTransaction } from "~/services/transactions"
import { Transaction } from "~/types/types"

type Props = {
    item: Transaction
}

const TransactionCard = ({ item }: Props) => {

    const [category] = useFetchCategoryById(item.categoryId)

    const [deleteTransaction] = useDeleteTransaction();

    const handleDeleteTransaction = (id: string) => {
        deleteTransaction(id);
    }

    const handleUpdateTransaction = (item: Transaction) => {
        openContextModal({
            modal: 'updateTransactionModal',
            title: 'Редактировать транзакцию',
            innerProps: {
                id: item.id,
                amount: item.amount,
                comment: item.comment ?? '',
                date: item.date,
                categoryId: item.categoryId,
                isIncome: item.isIncome,
            },
            size: 'xl',
        });
    }

    const openDeleteModal = (id: string) => modals.openConfirmModal({
        title: 'Вы уверены что хотите удалить эту транзакцию?',
        labels: { confirm: 'Да', cancel: 'Отмена' },
        confirmProps: { color: 'red' },
        cancelProps: { color: '' },
        onConfirm: () => handleDeleteTransaction(id),
    });


    if (!item) return 'Нет данных!'

    return (
        <div className='flex justify-between items-center gap-1 bg-[#2B244C] bg-opacity-80 p-2 rounded-md mb-1'>
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

            <Popover
                width={40}
                offset={0}
                position="bottom"
                withArrow shadow="md"
                zIndex={0}
            >
                <Popover.Target>
                    <IconDotsVertical size={28} color="gray" />
                </Popover.Target>
                <Popover.Dropdown
                    className="flex flex-col justify-center items-center gap-2"
                >
                    <Button
                        variant="outline"
                        p={0}
                        w={28}
                        h={28}
                        onClick={() => {
                            handleUpdateTransaction(item)

                        }}
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
    )
}

export default TransactionCard