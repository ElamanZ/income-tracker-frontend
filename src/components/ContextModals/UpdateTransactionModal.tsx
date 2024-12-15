import { ContextModalProps } from "@mantine/modals";
import TransactionForm from "../Transactions/TransactionForm";
import { UpdateTransactionArg, useUpdateTransaction } from "~/services/transactions";

type Props = ContextModalProps<{
    id: string;
    comment?: string;
    isIncome: boolean;
    amount: number;
    date: Date;
    categoryId: string;
}>;



const UpdateTransactionModal = (props: Props) => {


    const [updateTransaction] = useUpdateTransaction();

    const handleUpdateSubmit = (values: UpdateTransactionArg['data'], id: string) => {
        updateTransaction({ id, data: values });
        props.context.closeModal(props.id);
    };

    return (
        <TransactionForm
            defaultValues={{
                categoryId: props.innerProps.categoryId,
                amount: props.innerProps.amount,
                comment: props.innerProps.comment ?? '',
                date: props.innerProps.date,
                isIncome: props.innerProps.isIncome,
            }}
            isIncome={props.innerProps.isIncome}
            onSubmit={(values) => handleUpdateSubmit(values, props.innerProps.id)}
        />
    )
}

export default UpdateTransactionModal