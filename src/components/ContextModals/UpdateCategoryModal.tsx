import { ContextModalProps } from "@mantine/modals";
import CategoryFrom from "../Categories/CategoryFrom";
import { UpdateCategoryArg, useUpdateCategory } from "~/services/category";

type Props = ContextModalProps<{
    id: string;
    name: string;
    color: string;
    isIncome: boolean;
}>;

const UpdateCategoryModal = (props: Props) => {


    const [updateCategory] = useUpdateCategory();

    const handleUpdateSubmit = (values: UpdateCategoryArg['data'], id: string) => {
        updateCategory({ id, data: values });
        props.context.closeModal(props.id);
    };

    return (
        <CategoryFrom
            defaultValues={{
                color: props.innerProps.color,
                name: props.innerProps.name,
                isIncome: props.innerProps.isIncome,
            }}
            onSubmit={(values) => handleUpdateSubmit(values, props.innerProps.id)}
        />
    )
}

export default UpdateCategoryModal