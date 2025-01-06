import { Button, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { modals, openContextModal } from '@mantine/modals';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router'
import { useDeleteCategory, useFetchGroupedCategories } from '~/services/category';
import { cn } from '~/utils/cn';

import ReactDOM from 'react-dom';
import { Category } from '~/types/types';

function CategoriesPage() {

    const isMobile = useMediaQuery("(max-width: 767px)");
    const portal = document.getElementById('title');

    const [groupedCategories] = useFetchGroupedCategories();

    const [deleteCategory] = useDeleteCategory();

    const handleDeleteCategory = (id: string) => {
        deleteCategory(id);
    }

    const handleCreateCategory = () => {
        openContextModal({
            modal: 'createCategoryModal',
            title: 'Новая категория',
            innerProps: {},
            size: 'xl',
        });
    }

    const handleUpdateCategory = (item: Category) => {
        openContextModal({
            modal: 'updateCategoryModal',
            title: 'Редактировать категорию',
            innerProps: {
                id: item.id,
                name: item.name,
                color: item.color,
                isIncome: item.isIncome,
            },
            size: 'xl',
        });
    }

    const openDeleteModal = (id: string) => modals.openConfirmModal({
        title: 'Вы уверены что хотите удалить эту категорию?',
        labels: { confirm: 'Да', cancel: 'Отмена' },
        confirmProps: { color: 'red' },
        cancelProps: { color: '' },
        onConfirm: () => handleDeleteCategory(id),
    });


    return (
        <>
            <div>
                {portal && (
                    ReactDOM.createPortal(
                        <Text size='xl'>
                            Категории
                        </Text>,
                        portal
                    )
                )}
            </div>

            <div className={cn('flex flex-col gap-3 h-screen p-3', { 'h-[calc(100vh-100px)]': isMobile })}>

                <Button
                    radius='md'
                    size='sm'
                    fullWidth
                    onClick={handleCreateCategory}
                >
                    Добавить категорию
                </Button>

                <div className='flex flex-col gap-4 overflow-y-auto mt-3'>

                    <div>
                        <div className='border h-7 flex justify-center items-center w-full mb-2 rounded-md text-[#2D2437]'>
                            <Text className='text-center text-md font-semibold text-[#30D8B1]'>Категории дохода</Text>
                        </div>

                        {groupedCategories.income.length === 0 && (
                            <Text>Нет категорий дохода</Text>
                        )}

                        {groupedCategories.income.map((item, index) => (
                            <div className='flex justify-between bg-[#2B244C] bg-opacity-80 p-2 rounded-md mb-1'>
                                <div key={item.id} className='flex gap-2 items-center '>
                                    <div className='w-6 h-6 rounded-md' style={{ backgroundColor: item.color }}></div>
                                    <Text>{index + 1}. {item.name}</Text>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <IconPencil
                                        size={25}
                                        strokeWidth={1.5}
                                        onClick={() => handleUpdateCategory(item)}
                                    />
                                    <IconTrash
                                        size={25}
                                        strokeWidth={1.5}
                                        color='red'
                                        onClick={() => openDeleteModal(item.id)}
                                    />
                                </div>
                            </div>
                        ))}

                    </div>

                    <div>
                        <div className='border h-7 flex justify-center items-center w-full mb-2 rounded-md text-[#2D2437]'>
                            <Text className='text-center text-md font-semibold text-[#EC4887]'>Категории расхода</Text>
                        </div>

                        {groupedCategories.expense.length === 0 && (
                            <Text>Нет категорий расхода</Text>
                        )}

                        {groupedCategories.expense.map((item, index) => (
                            <div className='flex justify-between bg-[#2B244C] bg-opacity-80 p-2 rounded-md mb-1'>
                                <div key={item.id} className='flex gap-2 items-center'>
                                    <div className='w-6 h-6 rounded-md' style={{ backgroundColor: item.color }}></div>
                                    <Text>{index + 1}. {item.name}</Text>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <IconPencil
                                        size={25}
                                        strokeWidth={1.5}
                                        onClick={() => handleUpdateCategory(item)}
                                    />
                                    <IconTrash
                                        size={25}
                                        strokeWidth={1.5}
                                        color='red'
                                        onClick={() => openDeleteModal(item.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>





                {/* <Modal
                    opened={openedCreateModal}
                    onClose={closeCreateModal}
                    radius='md'
                    title="Новая категория"
                    size="sm"
                >
                    <CategoryFrom onSubmit={handleCreateSubmit} />
                </Modal> */}

                {/* <Modal
                    opened={openedEditModal}
                    onClose={closeEditModal}
                    radius="md"
                    title="Редактирование категории"
                    size="sm"
                >
                    <CategoryFrom
                        defaultValues={currentCategory?.data}
                        onSubmit={(values) => handleEditSubmit(values, currentCategory!.id)}
                    />
                </Modal> */}
            </div>
        </>
    )

}


export const Route = createFileRoute('/_app/categories/')({
    component: CategoriesPage,
})