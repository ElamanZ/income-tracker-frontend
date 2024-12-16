import { ContextModalProps } from "@mantine/modals";
import CategoryFrom from "../Categories/CategoryFrom";
import { CreateCategoryArg, useCreateCategory } from "~/services/category";

type Props = ContextModalProps

const CreateCategoryModal = (props: Props) => {


    const [createCategory] = useCreateCategory();

    const handleCreateSubmit = (values: CreateCategoryArg) => {
        createCategory(values);
        props.context.closeModal(props.id);
    }

    return (
        <CategoryFrom onSubmit={handleCreateSubmit} />
    )
}

export default CreateCategoryModal