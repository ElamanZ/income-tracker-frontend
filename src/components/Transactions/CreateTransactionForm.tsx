import { NumberInput, SegmentedControl, Select, Text, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import CustomCreateBtn from "../Buttons/CustomCreateBtn";
import { CreateTransactionArg, createTransactionSchema } from "~/services/transactions";
import { DatePickerInput, DateValue } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";
import dayjs from "dayjs";
import { useFetchGroupedCategories } from "~/services/category";
import { categoryTypeSelectItems } from "~/types/enums";



type Props = {
  defaultValues?: Partial<CreateTransactionArg> | null;
  onSubmit(values: CreateTransactionArg): void;
  isIncome: boolean;
};


const CreateTransactionForm = ({ onSubmit, isIncome, defaultValues = {} }: Props) => {

  const isMobile = useMediaQuery("(max-width: 767px)");
  const today = dayjs()

  const [dates, setDate] = useState<DateValue>(dayjs().toDate());

  const [groupedCategories] = useFetchGroupedCategories();


  const form = useForm<CreateTransactionArg>({
    initialValues: {
      isIncome: isIncome,
      date: new Date(),
      amount: 0,
      categoryId: '',
      comment: '',
      ...defaultValues,
    },
    validate: zodResolver(createTransactionSchema),
  });




  console.log(form.values, 'values');
  console.log(form.errors, 'errors');

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <div className="space-y-4">

        <SegmentedControl
          color={form.values.isIncome ? "#30D8B1" : "#EC4887"}
          fullWidth
          radius={10}
          size="md"
          data={categoryTypeSelectItems}
          value={String(form.values.isIncome)}
          onChange={(val) => {
            form.setFieldValue("isIncome", val === "true");
          }}
          disabled
        />

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

        <div>
          <Text className="font-semibold text-sm mb-1">Выберите тип категории</Text>
          <Select
            size={isMobile ? 'sm' : 'md'}
            radius='md'
            placeholder="Категории"
            data={isIncome ? groupedCategories.income.map((item) => ({
              value: item.id,
              label: item.name,
            })) : groupedCategories.expense.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            {...form.getInputProps('categoryId')}
            clearable
          />
        </div>

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
          label="Комментарий"
          placeholder="Коммнетарий"
          radius='md'
          {...form.getInputProps("comment")}
        />

        <CustomCreateBtn
          title={defaultValues?.amount ? 'Изменить' : 'Создать'}
          type="submit"
        />
      </div>
    </form>
  )
}

export default CreateTransactionForm