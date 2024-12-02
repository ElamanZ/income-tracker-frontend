import { TextInput, type TextInputProps } from '@mantine/core';
import { useRef, forwardRef, useEffect } from 'react';
import { formatKGPhoneNumber, parsePhoneNumbersFromText } from '~/utils/parsePhoneNumbersFromText';


type Props = Omit<TextInputProps, 'onChange'> & {
  onChange?(val: string): void;
}

const PhoneInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = () => {
      const phone = parsePhoneNumbersFromText(inputRef.current?.value ?? '')[0] ?? '';
      const kgPhone = formatKGPhoneNumber(phone);

      if (kgPhone === '996') {
        if (inputRef.current) inputRef.current.value = '';
        if (onChange) onChange('');
        return;
      }

      if (inputRef.current) inputRef.current.value = '' + kgPhone;
      if (onChange) onChange('' + kgPhone);
    };

    useEffect(() => {
      if (typeof ref === 'function') {
        ref(inputRef.current)
      } else if (ref) {
        ref.current = inputRef.current
      }
    }, [inputRef, ref])

    return (
      <TextInput
        ref={inputRef}
        {...props}
        type="tel"
        onChange={handleChange}
      />
    )
  }
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
