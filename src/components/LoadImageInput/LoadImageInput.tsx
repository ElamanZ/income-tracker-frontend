import { FileInput, type FileInputProps, Loader } from '@mantine/core';
import { forwardRef, useState } from 'react';
import { useLoadImage } from '~/services/loadImage';

export type LoadImageProps = Omit<FileInputProps, 'value' | 'onChange'> & {
  onChange: (url: string | null) => void;
  value?: string | null;
};

const LoadImageInput = forwardRef<HTMLButtonElement, LoadImageProps>(function LoadImageInput({
  onChange,
  value: url,
  ...props
}, ref) {
  const [file, setFile] = useState<File | null>(null);
  const [loadImage, { isPending: imageLoading }] = useLoadImage();

  const handleChange = (image: File | null) => {
    setFile(file);
    if (!image) return;
    loadImage({ image })
      .then(({ url }) => {
        onChange(url);
      })
      .catch(() => {
        onChange(null);
      });
  }

  return (
    <div>
      {imageLoading
        ? <Loader />
        : url
          ? <img src={url} alt="error" width={225} height={200} />
          : null
      }
      <FileInput
        accept="image/*"
        capture="user"
        multiple={false}
        required
        value={file}
        disabled={imageLoading}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    </div>
  )
})

export default LoadImageInput