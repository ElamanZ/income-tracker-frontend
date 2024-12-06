import { Button, ColorPicker, Group, Radio, Text, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { CreateCategoryArg, createCategorySchema } from "~/services/category";


type Props = {
    defaultValues?: Partial<CreateCategoryArg> | null;
    onSubmit(values: CreateCategoryArg): void;
};

const CategoryFrom = ({ onSubmit, defaultValues = {} }: Props) => {

    const isMobile = useMediaQuery("(max-width: 767px)");

    const form = useForm<CreateCategoryArg>({
        initialValues: {
            name: '',
            color: '',
            isIncome: true,
            ...defaultValues,
        },
        validate: zodResolver(createCategorySchema),
    });

    const { setFieldValue } = form;

    console.log(form.values, 'values');
    console.log(form.errors, 'errors');

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <div className="space-y-4">
                <Radio.Group
                    name="categoryType"
                    label="Выберите тип категории"
                    withAsterisk
                    value={form.values.isIncome ? "isIncome" : "isNotIncome"}
                    onChange={(value) =>
                        setFieldValue('isIncome', value === "isIncome")
                    }
                >
                    <Group mt="xs">
                        <Radio
                            size={isMobile ? 'sm' : 'md'}
                            className="text-[#62B440]"
                            variant="outline"
                            color="green"
                            value='isIncome'
                            label="Категория для дохода"
                        />
                        <Radio
                            size={isMobile ? 'sm' : 'md'}
                            className="text-red-500"
                            variant="outline"
                            color="red"
                            value='isNotIncome'
                            label="Категория для расхода"
                        />
                    </Group>
                </Radio.Group>

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
                        swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                        {...form.getInputProps("color")}
                    />
                </div>

                <Button
                    type="submit"
                    fullWidth
                    color="#62B440"
                    radius='md'
                    size={isMobile ? 'sm' : 'md'}
                >
                    {defaultValues?.name ? 'Изменить' : 'Создать'}
                </Button>
            </div>
        </form>
    )
}

export default CategoryFrom