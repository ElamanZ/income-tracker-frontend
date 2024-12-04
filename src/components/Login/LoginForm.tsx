import { Button, PasswordInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
// import { PhoneInput } from 'components/PhoneInput/PhoneInput';
import { z } from "zod";
import { PhoneInput } from "../PhoneInput/PhoneInput";
// import { Lock, Phone } from 'tabler-icons-react';
// import { z } from 'zod';

// eslint-disable-next-line react-refresh/only-export-components
export const loginFormSchema = z.object({
  phone: z.string().min(6, "Номер телефона должен быть не менее 6 символов"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

type Props = {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
};

const LoginForm = ({ onSubmit, loading }: Props) => {
  const form = useForm<LoginFormValues>({
    initialValues: {
      phone: "",
      password: "",
    },
    validate: zodResolver(loginFormSchema),
  });

  // const handleSendSms = () => {
  //   toast.success('Смс отправлено');
  // }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <h1 className="font-bold text-center">Войти в личный кабинет</h1>

      <PhoneInput
        id="phone"
        mt="sm"
        label="Номер телефона"
        required
        placeholder="+996*********"
        radius={10}
        {...form.getInputProps("phone")}
      />
      <PasswordInput
        id="password-inp"
        mt="sm"
        label="Пароль"
        placeholder="Введите пароль"
        required
        radius={10}
        {...form.getInputProps("password")}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        color="#62B440"
        mt="lg"
        size="sm"
        radius={10}
        fullWidth
        disabled={loading}
      >
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;
