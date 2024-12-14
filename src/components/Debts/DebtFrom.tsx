import { NumberInput, SegmentedControl, Text, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import CustomCreateBtn from "../Buttons/CustomCreateBtn";
import { debtTypeSelectItems } from "~/types/enums";
import { CreateDebtArg, createDebtSchema } from "~/services/debts";
import { DatePickerInput, DateValue } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";


type Props = {
    defaultValues?: Partial<CreateDebtArg> | null;
    onSubmit(values: CreateDebtArg): void;
};

const DebtFrom = ({ onSubmit, defaultValues = {} }: Props) => {

    const isMobile = useMediaQuery("(max-width: 767px)");

    const today = dayjs()

    const [dates, setDate] = useState<DateValue>(dayjs().toDate());


    const form = useForm<CreateDebtArg>({
        initialValues: {
            name: '',
            comment: '',
            isMyDebt: true,
            active: true,
            amount: 0,
            date: new Date(),
            ...defaultValues,
        },
        validate: zodResolver(createDebtSchema),
    });

    console.log(form.values, 'values');
    console.log(form.errors, 'errors');

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <div className="space-y-4">

                <div>
                    <Text className="font-semibold text-sm mb-1">Выберите тип долга</Text>
                    <SegmentedControl
                        color={form.values.isMyDebt ? "orange" : "blue"}
                        fullWidth
                        radius={10}
                        size="md"
                        data={debtTypeSelectItems}
                        value={String(form.values.isMyDebt)}
                        onChange={(val) => {
                            form.setFieldValue("isMyDebt", val === "true");
                        }}
                    />
                </div>

                <DatePickerInput
                    label="Дата"
                    leftSection={<IconCalendar size={16} />}
                    size={isMobile ? 'sm' : 'md'}
                    radius='md'
                    value={dates}
                    defaultValue={today.toDate()}
                    onChange={val => {
                        form.setFieldValue('date', val as Date)
                        setDate(val)
                    }}
                />



                <NumberInput
                    size={isMobile ? 'sm' : 'md'}
                    onInput={(e) => {
                        const input = e.currentTarget;
                        input.value = input.value.replace(/^0+/, '');
                    }}
                    radius='md'
                    label="Сумма"
                    hideControls
                    min={1}
                    {...form.getInputProps("amount")}
                />


                <TextInput
                    mt="sm"
                    size={isMobile ? 'sm' : 'md'}
                    label="Название"
                    placeholder="Название долга"
                    radius='md'
                    {...form.getInputProps("name")}
                />

                <TextInput
                    mt="sm"
                    size={isMobile ? 'sm' : 'md'}
                    label="Комментарий"
                    placeholder="Комментарий долга"
                    radius='md'
                    {...form.getInputProps("comment")}
                />



                <CustomCreateBtn
                    title={defaultValues?.name ? 'Изменить' : 'Создать'}
                    type="submit"
                />
            </div>
        </form>
    )
}

export default DebtFrom