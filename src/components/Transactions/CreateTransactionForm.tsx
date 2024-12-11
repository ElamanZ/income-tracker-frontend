import { ColorPicker, Text, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import CustomCreateBtn from "../Buttons/CustomCreateBtn";
import { CreateTransactionArg, createTransactionSchema } from "~/services/transactions";


type Props = {
  defaultValues?: Partial<CreateTransactionArg> | null;
  onSubmit(values: CreateTransactionArg): void;
  isIncome: boolean;
};


const CreateTransactionForm = ({ onSubmit, isIncome, defaultValues = {} }: Props) => {

  const isMobile = useMediaQuery("(max-width: 767px)");

  const form = useForm<CreateTransactionArg>({
    initialValues: {
      isIncome: isIncome,
      amount: 0,
      date: new Date(),
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

        <div>
          <Text className="font-semibold text-sm mb-1">Выберите тип категории</Text>

        </div>

        <TextInput
          mt="sm"
          size={isMobile ? 'sm' : 'md'}
          label="Название"
          placeholder="Название категории"
          required
          radius='md'
          {...form.getInputProps("name")}
        />

        <div>
          <Text size={isMobile ? 'sm' : 'md'} mt="sm">Цвет категории</Text>
          <ColorPicker
            size={isMobile ? 'sm' : 'md'}
            fullWidth
            format="hex"
            swatchesPerRow={8}
            swatches={['#D830B4', '#AB30D8', '#7630D8', '#3033D8', '#30A3D8', '#1BE4A7', '#30D8BF', '#D83030', '#D86030', '#D8CA30', '#1CCE46', '#727272', '#1E1055', '#025757', '#650', '#552210']}
            {...form.getInputProps("color")}
          />
        </div>

        <CustomCreateBtn
          title={defaultValues?.amount ? 'Изменить' : 'Создать'}
          type="submit"
        />
      </div>
    </form>
  )
}

export default CreateTransactionForm