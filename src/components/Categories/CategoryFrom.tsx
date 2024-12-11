import { ColorPicker, SegmentedControl, SegmentedControlItem, Text, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { CreateCategoryArg, createCategorySchema } from "~/services/category";
import CustomCreateBtn from "../Buttons/CustomCreateBtn";


type Props = {
    defaultValues?: Partial<CreateCategoryArg> | null;
    onSubmit(values: CreateCategoryArg): void;
};

export const CategoryType = {
    isIncome: true,
    isNotIncome: false,
} as const;

export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType];

export const categoryTypeSelectItems: SegmentedControlItem[] = [
    {
        value: "true",
        label: "Доход",
    },
    {
        value: "false",
        label: "Расход",
    },
];

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

    console.log(form.values, 'values');
    console.log(form.errors, 'errors');

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <div className="space-y-4">

                <div>
                    <Text className="font-semibold text-sm mb-1">Выберите тип категории</Text>
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
                    />
                </div>

                <TextInput
                    mt="sm"
                    size={isMobile ? 'sm' : 'md'}
                    label="Название"
                    placeholder="Название категории"
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
                    title={defaultValues?.name ? 'Изменить' : 'Создать'}
                    type="submit"
                />
            </div>
        </form>
    )
}

export default CategoryFrom