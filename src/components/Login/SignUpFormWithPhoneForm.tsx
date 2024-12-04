import { Button, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import {
  SignUpWithPhoneArg,
  signUpWithPhoneSchema,
} from "../../services/signUpWithPhone";
import { PhoneInput } from "../PhoneInput/PhoneInput";
import { useCreateCodeByPhone } from "../../services/createCodeByPhone";
import { useState } from "react";
import batele from "../../assets/registration/icon.svg";
import { Link } from "@tanstack/react-router";
import { IconChevronLeft } from "@tabler/icons-react";
type Props = {
  onSubmit: (values: SignUpWithPhoneArg) => void;
  loading?: boolean;
};

const SignUpFormWithPhoneForm = ({ onSubmit, loading }: Props) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const { sendSmsCode, isCanSendNewSms } = useCreateCodeByPhone({
    onError() {
      setIsCodeSent(false);
    },
  });

  const form = useForm<SignUpWithPhoneArg>({
    initialValues: {
      phone: "",
      firstName: "",
      lastName: "",
      newPassword: "",
      passwordConfirm: "",
      otpCode: "",
    },
    validate: zodResolver(signUpWithPhoneSchema),
  });

  const handleGetCode = () => {
    sendSmsCode(form.values.phone);
    setIsCodeSent(true);
  };

  return (
    <form
      onSubmit={form.onSubmit(onSubmit)}
      className="px-10 py-10 bg-white rounded-3xl"
    >
      <div className="flex items-center mb-5 justify-between">
        <Button
          className='rounded-full'
          w={40}
          h={40}
          p={0}
          color="rgba(255, 255, 255, 1)"
        >
          <Link to="/signin" from="/signup">
            <IconChevronLeft color='black' strokeWidth={1.2} size={30} />
          </Link>
        </Button>

        <div className="flex justify-center items-center ">
          <img src={batele} alt="batele" width={150} />
        </div>

        <div className="w-10"></div>
      </div>
      <h1 className="font-bold text-center">Создайте профиль</h1>

      <div className="flex-col flex">
        <TextInput
          mt="sm"
          label="Имя"
          placeholder="Имя"
          className="w-[330px]"
          required
          variant="filled"
          radius={10}
          {...form.getInputProps("firstName")}
          autoComplete="firstName"
        />
        <PhoneInput
          mt="sm"
          label="Номер телефона"
          required
          placeholder="+996*********"
          variant="filled"
          radius={10}
          {...form.getInputProps("phone")}
        />

        <div>
          <PasswordInput
            mt="sm"
            label="Новый пароль"
            placeholder="Пароль"
            required
            variant="filled"
            radius={10}
            {...form.getInputProps("newPassword")}
            autoComplete="newPassword"
          />
          <p className="mt-2 text-sm font-normal text-gray-600">
            Минимум 8 знаков
          </p>
        </div>
        <PasswordInput
          mt="sm"
          label="Повторите пароль"
          placeholder="Повторите пароль"
          variant="filled"
          required
          radius={10}
          {...form.getInputProps("passwordConfirm")}
          autoComplete="passwordConfirm"
        />
      </div>

      {isCodeSent && (
        <div className="w-full flex justify-center">
          <PinInput
            type={/^[0-9]*$/}
            mt="lg"
            inputType="tel"
            inputMode="numeric"
            radius={10}
            {...form.getInputProps("otpCode")}
          />
        </div>
      )}

      {!isCodeSent ? (
        <Button
          type="button"
          mt="lg"
          color="#62B440"
          size="sm"
          radius={10}
          fullWidth
          disabled={loading || !isCanSendNewSms}
          onClick={handleGetCode}
        >
          Получить код подтверждения
        </Button>
      ) : (
        <Button
          type="submit"
          mt="lg"
          size="sm"
          radius={10}
          color="#62B440"
          fullWidth
          disabled={loading}
        >
          Зарегистрироваться
        </Button>
      )}
    </form>
  );
};

export default SignUpFormWithPhoneForm;
