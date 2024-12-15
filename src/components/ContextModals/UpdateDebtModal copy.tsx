import { ContextModalProps } from "@mantine/modals";
import DebtFrom from "../Debts/DebtFrom";
import { UpdateDebtArg, useUpdateDebt } from "~/services/debts";

type Props = ContextModalProps<{
    id: string;
    name: string;
    comment?: string;
    isMyDebt: boolean;
    active: boolean;
    amount: number;
    date: Date;
}>;



const UpdateDebtModal = (props: Props) => {


    const [updateDebt] = useUpdateDebt();

    const handleUpdateSubmit = (values: UpdateDebtArg['data'], id: string) => {
        updateDebt({ id, data: values });
        props.context.closeModal(props.id);
    };

    return (
        <DebtFrom
            defaultValues={{
                name: props.innerProps.name,
                comment: props.innerProps.comment ?? '',
                isMyDebt: props.innerProps.isMyDebt,
                active: props.innerProps.active,
                amount: props.innerProps.amount,
                date: props.innerProps.date,

            }}
            onSubmit={(values) => handleUpdateSubmit(values, props.innerProps.id)}
        />
    )
}

export default UpdateDebtModal