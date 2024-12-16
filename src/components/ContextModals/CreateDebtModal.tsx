import { ContextModalProps } from "@mantine/modals";
import { CreateDebtArg, useCreateDebt } from "~/services/debts";
import DebtFrom from "../Debts/DebtFrom";

type Props = ContextModalProps

const CreateDebtModal = (props: Props) => {


    const [createDebt] = useCreateDebt();

    const handleCreateSubmit = (values: CreateDebtArg) => {
        createDebt(values);
        props.context.closeModal(props.id);
    }

    return (
        <DebtFrom onSubmit={handleCreateSubmit} />
    )
}

export default CreateDebtModal