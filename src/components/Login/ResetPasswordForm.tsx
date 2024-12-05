import { Button, PasswordInput, PinInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { PhoneInput } from "../PhoneInput/PhoneInput";
import { useCreateCodeByPhone } from "../../services/createCodeByPhone";
import { useState } from "react";
import batele from "../../assets/registration/icon.svg";
import { Link } from "@tanstack/react-router";
import { IconChevronLeft } from "@tabler/icons-react";
import { ResetPasswordWithPhoneArg, resetPasswordWithPhoneSchema } from "~/services/resetPasswordWithPhone";

type Props = {
    onSubmit: (values: ResetPasswordWithPhoneArg) => void;
    loading?: boolean;
};

const ResetPasswordFormWithPhoneForm = ({ onSubmit, loading }: Props) => {

    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isShowPasswordInput, setIsShowPasswordInput] = useState(false);
    const { sendSmsCode, isCanSendNewSms } = useCreateCodeByPhone({
        onError() {
            setIsCodeSent(false);
        },
    });

    const form = useForm<ResetPasswordWithPhoneArg>({
        initialValues: {
            phone: "",
            newPassword: "",
            passwordConfirm: "",
            otpCode: "",
        },
        validate: zodResolver(resetPasswordWithPhoneSchema),
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
                    <Link to="/signin" from="/resetPassword">
                        <IconChevronLeft color='black' strokeWidth={1.2} size={30} />
                    </Link>
                </Button>

                <div className="flex justify-center items-center ">
                    <img src={batele} alt="batele" width={150} />
                </div>

                <div className="w-10"></div>
            </div>
            <h1 className="font-bold text-center">Сброс пароля</h1>

            <div className="flex-col flex">
                <PhoneInput
                    mt="sm"
                    label="Номер телефона"
                    className="w-[330px]"
                    required
                    placeholder="+996*********"
                    variant="filled"
                    radius={10}
                    {...form.getInputProps("phone")}
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

            {!isCodeSent && (
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
            )}
            {isCodeSent && !isShowPasswordInput && (
                <Button
                    type="button"
                    mt="lg"
                    color="#62B440"
                    size="sm"
                    radius={10}
                    fullWidth
                    onClick={() => setIsShowPasswordInput(true)}
                >
                    Подтвердить код подтверждения
                </Button>
            )}
            {isShowPasswordInput && (
                <div>
                    <div>
                        <PasswordInput
                            mt="sm"
                            label="Пароль"
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
                        label="Повтерите пароль"
                        placeholder="Повтерите пароль"
                        variant="filled"
                        required
                        radius={10}
                        {...form.getInputProps("passwordConfirm")}
                        autoComplete="passwordConfirm"
                    />
                </div>
            )}

            {isShowPasswordInput && (
                <Button
                    type="submit"
                    mt="lg"
                    size="sm"
                    radius={10}
                    fullWidth
                    color="#62B440"
                    disabled={loading}
                >
                    Сбросить пароль
                </Button>
            )}
        </form>
    );
};

export default ResetPasswordFormWithPhoneForm;
