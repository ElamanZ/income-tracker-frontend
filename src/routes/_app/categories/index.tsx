import { Button, Modal, Text } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router'
import CategoryFrom from '~/components/Categories/CategoryFrom'
import { CreateCategoryArg, UpdateCategoryArg, useCreateCategory, useDeleteCategory, useFetchGroupedCategories, useUpdateCategory } from '~/services/category';
import { cn } from '~/utils/cn';
import { useState } from 'react';
import ReactDOM from 'react-dom';

function CategoriesPage() {

    const isMobile = useMediaQuery("(max-width: 767px)");
    const portal = document.getElementById('title');
    const [currentCategory, setCurrentCategory] = useState<UpdateCategoryArg | null>(null);

    const [openedCreateModal, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
    const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);


    const [createCategory] = useCreateCategory();
    const [groupedCategories] = useFetchGroupedCategories();

    const [updateCategory] = useUpdateCategory();
    const [deleteCategory] = useDeleteCategory();



    const handleCreateSubmit = (values: CreateCategoryArg) => {
        createCategory(values);
        closeCreateModal();
    }

    const handleEditSubmit = (values: UpdateCategoryArg['data'], id: string) => {
        updateCategory({ id, data: values });
        closeEditModal();
        setCurrentCategory(null);
    };

    const handleOpenEditModal = (category: UpdateCategoryArg) => {
        setCurrentCategory(category);
        openEditModal();
    };

    const handleDeleteCategory = (id: string) => {
        deleteCategory(id);
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

            <div className={cn('flex flex-col gap-3 justify-between h-screen', { 'h-[calc(100vh-100px)]': isMobile })}>

                <div className='flex flex-col gap-4'>

                    <div>
                        <div className='bg-[#30D8B1] h-10 flex justify-center items-center w-full mb-2 rounded-md text-[#2D2437]'>
                            <Text className='text-center text-lg font-semibold'>Категории дохода</Text>
                        </div>

                        {groupedCategories.income.length === 0 && (
                            <Text>Нет категорий дохода</Text>
                        )}

                        {groupedCategories.income.map((item, index) => (
                            <div className='flex justify-between bg-[#2B244C] bg-opacity-80 p-2 rounded-md'>
                                <div key={item.id} className='flex gap-2 items-center '>
                                    <div className='w-6 h-6 rounded-md' style={{ backgroundColor: item.color }}></div>
                                    <Text>{index + 1}. {item.name}</Text>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <IconPencil
                                        size={25}
                                        strokeWidth={1.5}
                                        onClick={() =>
                                            handleOpenEditModal({
                                                id: item.id,
                                                data: { name: item.name, color: item.color, isIncome: item.isIncome },
                                            })
                                        } />
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
                        <div className='bg-[#EC4887] h-10 flex justify-center items-center w-full mb-2 rounded-md text-[#2D2437]'>
                            <Text className='text-center text-lg font-semibold'>Категории расхода</Text>
                        </div>

                        {groupedCategories.expense.length === 0 && (
                            <Text>Нет категорий расхода</Text>
                        )}

                        {groupedCategories.expense.map((item, index) => (
                            <div className='flex justify-between bg-[#2B244C] bg-opacity-80 p-2 rounded-md'>
                                <div key={item.id} className='flex gap-2 items-center'>
                                    <div className='w-6 h-6 rounded-md' style={{ backgroundColor: item.color }}></div>
                                    <Text>{index + 1}. {item.name}</Text>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <IconPencil
                                        size={25}
                                        strokeWidth={1.5}
                                        onClick={() =>
                                            handleOpenEditModal({
                                                id: item.id,
                                                data: { name: item.name, color: item.color, isIncome: item.isIncome },
                                            })
                                        } />
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

                {!openedCreateModal && (
                    <Button
                        radius='md'
                        fullWidth
                        onClick={openCreateModal}
                    >
                        Добавить категорию
                    </Button>
                )}


                <Modal
                    opened={openedCreateModal}
                    onClose={closeCreateModal}
                    radius='md'
                    title="Новая категория"
                    size="sm"
                >
                    <CategoryFrom onSubmit={handleCreateSubmit} />
                </Modal>

                <Modal
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
                </Modal>
            </div>
        </>
    )

}


export const Route = createFileRoute('/_app/categories/')({
    component: CategoriesPage,
})