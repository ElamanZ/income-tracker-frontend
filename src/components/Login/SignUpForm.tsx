import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { PhoneInput } from "../PhoneInput/PhoneInput";
import { Link } from "@tanstack/react-router";
import { IconChevronLeft } from "@tabler/icons-react";
import { SignUpArg, signUpSchema } from "~/services/signUp";
type Props = {
    onSubmit: (values: SignUpArg) => void;
    loading?: boolean;
};

const SignUpForm = ({ onSubmit, loading }: Props) => {
    const form = useForm<SignUpArg>({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            password: "",
            passwordConfirm: "",
            avatarUrl: null
        },
        validate: zodResolver(signUpSchema),
    });


    return (
        <form
            onSubmit={form.onSubmit(onSubmit)}
        >
            <div className="flex justify-between items-center">
                <Link to="/signin" from="/signup">
                    <IconChevronLeft color='black' strokeWidth={1.2} size={30} />
                </Link>
                <Text
                    size='lg'
                    className="font-bold text-center"
                >
                    Регистрация
                </Text>
                <div className="w-10"></div>
            </div>

            <div className="flex-col flex">
                <TextInput
                    mt="sm"
                    label="Имя"
                    placeholder="Имя"
                    className="w-[285px]"
                    required
                    variant="filled"
                    radius='md'
                    {...form.getInputProps("firstName")}
                    autoComplete="firstName"
                />

                <TextInput
                    mt="sm"
                    label="Фамилия"
                    placeholder="Фамилия"
                    className="w-[285px]"
                    required
                    variant="filled"
                    radius='md'
                    {...form.getInputProps("lastName")}
                    autoComplete="lastName"
                />

                <PhoneInput
                    mt="sm"
                    label="Номер телефона"
                    required
                    placeholder="+996*********"
                    variant="filled"
                    radius='md'
                    {...form.getInputProps("phone")}
                />


                <div>
                    <PasswordInput
                        mt="sm"
                        label="Пароль"
                        placeholder="Пароль"
                        required
                        variant="filled"
                        radius='md'
                        {...form.getInputProps("password")}
                        autoComplete="password"
                    />
                    <p className="mt-2 text-sm font-normal text-gray-600">
                        Минимум 6 знаков
                    </p>
                </div>
                <PasswordInput
                    mt="sm"
                    label="Повторите пароль"
                    placeholder="Повторите пароль"
                    variant="filled"
                    required
                    radius='md'
                    {...form.getInputProps("passwordConfirm")}
                />
            </div>

            <Button
                type="submit"
                mt="lg"
                size="sm"
                radius='md'
                color="#62B440"
                fullWidth
                disabled={loading}
            >
                Зарегистрироваться
            </Button>
        </form>
    );
};

export default SignUpForm;
