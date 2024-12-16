import { ContextModalProps } from "@mantine/modals";
import TransactionForm from "../Transactions/TransactionForm";
import { CreateTransactionArg, useCreateTransaction } from "~/services/transactions";

type Props = ContextModalProps<{
    isIncome: boolean;
}>;

const CreateTransactionModal = (props: Props) => {

    const [createTransaction] = useCreateTransaction();

    const handleCreateSubmit = (values: CreateTransactionArg) => {
        createTransaction(values);
        props.context.closeModal(props.id);
    }

    return (
        <TransactionForm isIncome={props.innerProps.isIncome} onSubmit={handleCreateSubmit} />
    )
}

export default CreateTransactionModal